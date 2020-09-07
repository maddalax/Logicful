package user

import (
	"errors"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"github.com/logicful/service/debug"
	"golang.org/x/crypto/bcrypt"
	"log"
	"os"
	"strings"
	"time"
)

var instance = db.New()

func Login(user models.User) (models.TokenResponse, error) {
	byEmail, err := ByEmail(user.Email)
	if err != nil {
		return models.TokenResponse{}, err
	}
	if byEmail.Id == "" || !compare(byEmail.Password, []byte(user.Password)) {
		return models.TokenResponse{}, errors.New("invalid username or password")
	}
	token, err := signToken(byEmail)
	if err != nil {
		return models.TokenResponse{}, err
	}
	return token, nil
}

func RefreshToken(token string) models.TokenResponse {
	println(token)
	user := ByToken(token)
	debug.Debug(user)
	if user.Id == "" {
		return models.TokenResponse{}
	}
	signed, err := signToken(user)
	if err != nil {
		return models.TokenResponse{}
	}
	return signed
}

func ByToken(token string) models.User {
	if token == "" {
		return models.User{}
	}
	var user = models.UserLoginClaims{}
	result, err := jwt.ParseWithClaims(token, &user, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("JWT_SIGN_TOKEN")), nil
	})

	if err != nil {
		return models.User{}
	}

	if !result.Valid {
		return models.User{}
	}

	return models.User{
		Id:        user.Id,
		Email:     user.Email,
		FullName: user.FullName,
		DisplayName: user.DisplayName,
		TeamId:    user.TeamId,
		Creatable: user.Creatable,
	}
}

func ByEmail(email string) (models.User, error) {
	results, err := db.New().Query(&dynamodb.QueryInput{
		TableName:              aws.String(db.Data()),
		IndexName:              aws.String("UserByEmail"),
		KeyConditionExpression: aws.String("email = :email"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":email": {S: aws.String(email)},
		},
	})
	if err != nil {
		return models.User{}, err
	}
	var users []models.User
	err = dynamodbattribute.UnmarshalListOfMaps(results.Items, &users)
	if err != nil {
		return models.User{}, err
	}
	if len(users) == 0 {
		return models.User{}, nil
	}
	return users[0], nil
}

func Register(user models.User) (models.TokenResponse, error) {

	user = models.User{
		Email:     user.Email,
		FullName: user.FullName,
		DisplayName: user.DisplayName,
		Password:  user.Password,
		TeamId:    user.TeamId,
	}

	user.Email = strings.ToLower(user.Email)
	user.Email = strings.TrimSpace(user.Email)
	user.DisplayName = strings.TrimSpace(user.DisplayName)
	user.FullName = strings.TrimSpace(user.FullName)

	if user.TeamId == "" {
		user.TeamId = uuid.New().String()
	}

	if user.Id == "" {
		user.Id = uuid.New().String()
	}

	user.Password = hash([]byte(user.Password))

	user.CreationDate = date.ISO8601(time.Now())
	user.ChangeDate = date.ISO8601(time.Now())

	av, err := dynamodbattribute.MarshalMap(user)

	av["PK"] = &dynamodb.AttributeValue{
		S: aws.String("USER#" + user.Id),
	}

	av["SK"] = &dynamodb.AttributeValue{
		S: aws.String("PROFILE#" + user.Id),
	}

	var created = make(map[string]*dynamodb.AttributeValue)

	created["PK"] = &dynamodb.AttributeValue{
		S: aws.String("USEREMAIL#" + user.Email),
	}

	created["SK"] = &dynamodb.AttributeValue{
		S: aws.String("REGISTERED"),
	}

	_, err = instance.TransactWriteItems(&dynamodb.TransactWriteItemsInput{
		TransactItems: []*dynamodb.TransactWriteItem{
			{
				Put: &dynamodb.Put{
					TableName: aws.String(db.Data()),
					Item:      av,
				},
			},
			{
				Put: &dynamodb.Put{
					TableName:           aws.String(db.Data()),
					ConditionExpression: aws.String("attribute_not_exists(PK)"),
					Item:                created,
				},
			},
		},
	})

	if canceled, ok := err.(*dynamodb.TransactionCanceledException); ok {
		for i := range canceled.CancellationReasons {
			code := *canceled.CancellationReasons[i].Code
			if code == "ConditionalCheckFailed" {
				return models.TokenResponse{}, errors.New("email already exists")
			}
		}
	}

	if err != nil {
		return models.TokenResponse{}, err
	}

	token, err := signToken(user)

	if err != nil {
		return models.TokenResponse{}, err
	}

	return token, nil
}

func hash(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.DefaultCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}

func compare(hashed string, plain []byte) bool {
	byteHash := []byte(hashed)
	err := bcrypt.CompareHashAndPassword(byteHash, plain)
	if err != nil {
		return false
	}
	return true
}

func signToken(user models.User) (models.TokenResponse, error) {
	expiration := time.Now().UTC().Add(time.Hour * 168)
	claims := models.UserLoginClaims{
		Id:        user.Id,
		Email:     user.Email,
		FullName: user.FullName,
		DisplayName: user.DisplayName,
		TeamId:    user.TeamId,
		Creatable: models.Creatable{
			CreationDate: user.CreationDate,
		},
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expiration.Unix(),
			Issuer:    "logicful",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	str, err := token.SignedString([]byte(os.Getenv("JWT_SIGN_TOKEN")))
	if err != nil {
		return models.TokenResponse{}, err
	}
	return models.TokenResponse{
		Token:      str,
		Expiration: expiration.UnixNano() / 1000000,
	}, nil
}
