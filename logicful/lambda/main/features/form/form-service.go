package form

import (
	"errors"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"strings"
	"time"
)

var instance = db.New()

func Set(form models.Form) (models.Form, error) {

	if form.TeamId == "" {
		return models.Form{}, errors.New("team id is required")
	}

	if form.Id == "" {
		form.Id = uuid.New().String()
	}

	if form.Folder == "" {
		form.Folder = form.TeamId + ":" + "uncategorized"
	} else {
		if !strings.HasPrefix(form.Folder, form.TeamId) {
			form.Folder = form.TeamId + ":" + form.Folder
		}
	}

	if form.CreationDate == "" {
		form.CreationDate = date.ISO8601(time.Now())
		form.CreateBy = "maddox2"
	}

	form.ChangeDate = date.ISO8601(time.Now())
	form.ChangeBy = "maddox2"

	fields, err := dynamodbattribute.Marshal(form.Fields)

	if err != nil {
		return models.Form{}, err
	}

	_, err = instance.UpdateItem(&dynamodb.UpdateItemInput{
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

	return form, err
}

func List(folder string) ([]models.Form, error) {
	if folder == "" {
		return nil, errors.New("folder id is required")
	}
	results, err := db.New().Query(&dynamodb.QueryInput{
		TableName:              aws.String(db.Data()),
		IndexName:              aws.String("FormFolderIndex"),
		KeyConditionExpression: aws.String("Folder = :folder"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":folder": {S: aws.String(folder)},
		},
		ProjectionExpression: aws.String("Title, Folder, ChangeDate, ChangeBy, CreationDate, CreateBy, FormId, TeamId"),
	})
	if err != nil {
		return nil, err
	}
	var forms []models.Form
	err = dynamodbattribute.UnmarshalListOfMaps(results.Items, &forms)

	for i := range forms {
		forms[i].Id = forms[i].FormId
		forms[i].FormId = ""
	}

	if err != nil {
		return nil, err
	}
	return forms, nil
}

func Get(id string, user models.User) (models.Form, error) {
	result, err := instance.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(db.Data()),
		Key: map[string]*dynamodb.AttributeValue{
			"PK": {
				S: aws.String("TEAM#" + user.TeamId),
			},
			"SK": {
				S: aws.String("FORM#" + id),
			},
		},
	})
	if err != nil {
		return models.Form{}, err
	}

	var form models.Form
	err = dynamodbattribute.UnmarshalMap(result.Item, &form)

	if err != nil {
		return models.Form{}, err
	}

	form.Id = form.FormId
	form.FormId = ""

	return form, nil
}
