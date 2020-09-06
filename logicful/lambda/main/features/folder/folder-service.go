package folder

import (
	"errors"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"time"
)

var instance = db.New()

func Set(folder models.Folder) (models.Folder, error) {

	if folder.TeamId == "" {
		return models.Folder{}, errors.New("client id is required")
	}

	if folder.Id == "" {
		folder.Id = folder.TeamId + ":" + uuid.New().String()
	}

	folder.CreationDate = date.ISO8601(time.Now())
	folder.ChangeDate = date.ISO8601(time.Now())
	folder.CreateBy = "maddox2"
	folder.ChangeBy = "maddox2"

	_, err := instance.UpdateItem(&dynamodb.UpdateItemInput{
		TableName: aws.String(db.Data()),
		Key: map[string]*dynamodb.AttributeValue{
			"PK": {
				S: aws.String("CLIENT#" + folder.TeamId),
			},
			"SK": {
				S: aws.String("FOLDER#" + folder.Id),
			},
		},
		UpdateExpression: aws.String("SET #teamId = :teamId, #folderId = :folderId, #name = :name, #changeDate = :changeDate, #changeBy = :changeBy, #creationDate = if_not_exists(#creationDate,:creationDate), #createBy = if_not_exists(#createBy,:createBy)"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":name": {
				S: aws.String(folder.Name),
			},
			":changeDate": {
				S: aws.String(folder.ChangeDate),
			},
			":creationDate": {
				S: aws.String(folder.CreationDate),
			},
			":changeBy": {
				S: aws.String(folder.ChangeBy),
			},
			":createBy": {
				S: aws.String(folder.CreateBy),
			},
			":folderId": {
				S: aws.String(folder.Id),
			},
			":teamId": {
				S: aws.String(folder.TeamId),
			},
		},
		ExpressionAttributeNames: map[string]*string{
			"#name":         aws.String("Name"),
			"#changeDate":   aws.String("ChangeDate"),
			"#changeBy":     aws.String("ChangeBy"),
			"#creationDate": aws.String("CreationDate"),
			"#createBy":     aws.String("CreateBy"),
			"#folderId":     aws.String("FolderId"),
			"#teamId":       aws.String("TeamId"),
		},
	})

	if err != nil {
		return models.Folder{}, err
	}

	return folder, err
}

func List(client string) ([]models.Folder, error) {

	if client == "" {
		return nil, errors.New("client is required")
	}

	results, err := db.New().Query(&dynamodb.QueryInput{
		TableName:              aws.String(db.Data()),
		KeyConditionExpression: aws.String("PK = :teamId AND begins_with (SK, :folder)"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":folder": {S: aws.String("FOLDER#")},
			":teamId": {S: aws.String("CLIENT#" + client)},
		},
	})
	if err != nil {
		return nil, err
	}
	var folders []models.Folder
	err = dynamodbattribute.UnmarshalListOfMaps(results.Items, &folders)

	if err != nil {
		return nil, err
	}

	for i := range folders {
		folders[i].Id = folders[i].FolderId
	}

	return folders, nil
}
