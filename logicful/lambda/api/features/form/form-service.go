package form

import (
	"encoding/json"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"github.com/logicful/service/storage"
	"time"
)

var instance = db.New()

func Set(form models.Form) (models.Form, error) {

	if form.Id == "" {
		form.Id = uuid.New().String()
	}

	form.CreateTime = date.ISO8601(time.Now())
	form.ChangeTime = date.ISO8601(time.Now())
	form.CreateBy = "maddox2"
	form.ChangeBy = "maddox2"

	fields, err := dynamodbattribute.Marshal(form.Fields)

	if err != nil {
		return models.Form{}, err
	}

	_, err = instance.TransactWriteItems(&dynamodb.TransactWriteItemsInput{
		TransactItems: []*dynamodb.TransactWriteItem{
			{
				Update: &dynamodb.Update{
					TableName: aws.String(db.Clients()),
					Key: map[string]*dynamodb.AttributeValue{
						"name": {
							S: aws.String("maddox"),
						},
					},
					UpdateExpression: aws.String("ADD #forms :forms"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":forms": {
							SS: aws.StringSlice([]string{form.Id}),
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#forms": aws.String("forms"),
					},
				},
			},
			{
				Update: &dynamodb.Update{
					TableName: aws.String(db.Forms()),
					Key: map[string]*dynamodb.AttributeValue{
						"id": {
							S: aws.String(form.Id),
						},
					},
					UpdateExpression: aws.String("SET #c1e70 = :c1e70, #c1e71 = :c1e71, #c1e72 = :c1e72, #c1e73 = if_not_exists(#c1e74,:c1e73), CreateBy = if_not_exists(#CreateBy,:CreateBy), ChangeBy = :ChangeBy"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":c1e70": {
							S: aws.String(form.Title),
						},
						":c1e71": {
							S: aws.String(form.ChangeTime),
						},
						":c1e72": fields,
						":c1e73": {
							S: aws.String(form.CreateTime),
						},
						":ChangeBy": {
							S: aws.String(form.ChangeBy),
						},
						":CreateBy": {
							S: aws.String(form.CreateBy),
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#c1e70":    aws.String("Title"),
						"#c1e71":    aws.String("ChangeTime"),
						"#c1e72":    aws.String("Fields"),
						"#c1e73":    aws.String("CreateTime"),
						"#c1e74":    aws.String("CreateTime"),
						"#CreateBy": aws.String("CreateBy"),
					},
				},
			},
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
}

func List(lean bool) ([]models.Form, error) {
	item, err := instance.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(db.Clients()),
		Key: map[string]*dynamodb.AttributeValue{
			"name": {
				S: aws.String("maddox"),
			},
		},
		ProjectionExpression: aws.String("forms"),
	})

	if item == nil || item.Item["forms"] == nil {
		return make([]models.Form, 0), nil
	}

	if err != nil {
		return nil, err
	}

	ids := item.Item["forms"].SS
	var keys []map[string]*dynamodb.AttributeValue
	for id := range ids {
		k := map[string]*dynamodb.AttributeValue{
			"id": {S: ids[id]},
		}
		keys = append(keys, k)
	}

	var projection *string = nil
	var projectionNames map[string]*string = nil
	if lean {
		projection = aws.String("id,#Title,ChangeTime,ChangeBy,CreateTime,CreateBy")
		projectionNames = map[string]*string{
			"#Title": aws.String("Title"),
		}
	}

	println(db.Forms())

	items, err := instance.BatchGetItem(&dynamodb.BatchGetItemInput{
		RequestItems: map[string]*dynamodb.KeysAndAttributes{
			db.Forms(): {
				Keys:                     keys,
				ProjectionExpression:     projection,
				ExpressionAttributeNames: projectionNames,
			},
		},
	})

	if err != nil {
		return nil, err
	}

	println(items.Responses)

	results := items.Responses[db.Forms()]

	var recs []models.Form

	err = dynamodbattribute.UnmarshalListOfMaps(results, &recs)

	if err != nil {
		return nil, err
	}

	return recs, nil
}

func Get(id string) (models.Form, error) {

	bytes, err := storage.DownloadToBytes("logicful-forms", id)

	if err != nil {
		return models.Form{}, err
	}

	var form = models.Form{}

	err = json.Unmarshal(bytes, &form)

	if err != nil {
		return models.Form{}, err
	}

	return form, nil
}
