package user

import (
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"golang.org/x/crypto/bcrypt"
	"log"
	"time"
)

func Login() {

}

func Register(user models.User) {

	if user.TeamId == "" {
		user.TeamId = uuid.New().String()
	}

	user = models.User{
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Password:  user.Password,
		TeamId:    user.TeamId,
	}

	user.CreationDate = date.ISO8601(time.Now())
	user.ChangeDate = date.ISO8601(time.Now())

	/*
		_, err := db.New().UpdateItem(&dynamodb.UpdateItemInput{
			TableName: aws.String(db.Data()),
			Key: map[string]*dynamodb.AttributeValue{
				"PK": {
					S: aws.String("TEAM#" + form.TeamId),
				},
				"SK": {
					S: aws.String("FORM#" + form.Id),
				},
			},
			UpdateExpression: aws.String("SET #teamId = :teamId, #formId = :formId, #title = :title, #fields = :fields, #folder = :folder, #changeDate = :changeDate, #changeBy = :changeBy, #creationDate = if_not_exists(#creationDate,:creationDate), #createBy = if_not_exists(#createBy,:createBy)"),
			ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
				":title": {
					S: aws.String(form.Title),
				},
				":changeDate": {
					S: aws.String(form.ChangeDate),
				},
				":fields": fields,
				":creationDate": {
					S: aws.String(form.CreationDate),
				},
				":changeBy": {
					S: aws.String(form.ChangeBy),
				},
				":createBy": {
					S: aws.String(form.CreateBy),
				},
				":formId": {
					S: aws.String(form.Id),
				},
				":teamId": {
					S: aws.String(form.TeamId),
				},
				":folder": {
					S: aws.String(form.Folder),
				},
			},
			ExpressionAttributeNames: map[string]*string{
				"#title":        aws.String("Title"),
				"#fields":       aws.String("Fields"),
				"#folder":       aws.String("Folder"),
				"#changeDate":   aws.String("ChangeDate"),
				"#changeBy":     aws.String("ChangeBy"),
				"#creationDate": aws.String("CreationDate"),
				"#createBy":     aws.String("CreateBy"),
				"#formId":       aws.String("FormId"),
				"#teamId":       aws.String("TeamId"),
			},
		})

		if err != nil {
			return models.Form{}, err
		}

		_, err = storage.SetJson(form, form.Id, "logicful-forms", "public-read")

		if err != nil {
			return models.Form{}, err
		}

		return form, err

	*/
}

func Hash(pwd []byte) string {

	// Use GenerateFromPassword to hash & salt pwd.
	// MinCost is just an integer constant provided by the bcrypt
	// package along with DefaultCost & MaxCost.
	// The cost can be any value you want provided it isn't lower
	// than the MinCost (4)
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	} // GenerateFromPassword returns a byte slice so we need to
	// convert the bytes to a string and return it
	return string(hash)
}
