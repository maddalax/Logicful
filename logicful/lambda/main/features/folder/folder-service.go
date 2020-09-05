package folder

import (
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

	if folder.Id == "" {
		folder.Id = uuid.New().String()
	}

	if folder.Forms == nil {
		folder.Forms = make([]models.LeanForm, 0)
	}

	folder.CreateTime = date.ISO8601(time.Now())
	folder.ChangeTime = date.ISO8601(time.Now())
	folder.CreateBy = "maddox2"
	folder.ChangeBy = "maddox2"

	forms, err := dynamodbattribute.Marshal(folder.Forms)

	if err != nil {
		return models.Folder{}, err
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
					UpdateExpression: aws.String("ADD #folders :folders"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":folders": {
							SS: aws.StringSlice([]string{folder.Id}),
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#folders": aws.String("folders"),
					},
				},
			},
			{
				Update: &dynamodb.Update{
					TableName: aws.String(db.Folders()),
					Key: map[string]*dynamodb.AttributeValue{
						"id": {
							S: aws.String(folder.Id),
						},
					},
					UpdateExpression: aws.String("ADD Version :version SET #parent = :parent, #c1e70 = :c1e70, #c1e71 = :c1e71, #c1e72 = :c1e72, #c1e73 = if_not_exists(#c1e74,:c1e73), CreateBy = if_not_exists(#CreateBy,:CreateBy), ChangeBy = :ChangeBy"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":c1e70": {
							S: aws.String(folder.Name),
						},
						":c1e71": {
							S: aws.String(folder.ChangeTime),
						},
						":c1e72": forms,
						":c1e73": {
							S: aws.String(folder.CreateTime),
						},
						":ChangeBy": {
							S: aws.String(folder.ChangeBy),
						},
						":CreateBy": {
							S: aws.String(folder.CreateBy),
						},
						":parent": {
							S: aws.String(folder.Parent),
						},
						":version": {
							N: aws.String("1"),
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#c1e70":    aws.String("Name"),
						"#c1e71":    aws.String("ChangeTime"),
						"#c1e72":    aws.String("Forms"),
						"#c1e73":    aws.String("CreateTime"),
						"#c1e74":    aws.String("CreateTime"),
						"#CreateBy": aws.String("CreateBy"),
						"#parent":   aws.String("Parent"),
					},
				},
			},
		},
	})

	if err != nil {
		return models.Folder{}, err
	}

	return folder, err
}

func List() ([]models.Folder, error) {
	item, err := instance.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(db.Clients()),
		Key: map[string]*dynamodb.AttributeValue{
			"name": {
				S: aws.String("maddox"),
			},
		},
		ProjectionExpression: aws.String("folders"),
	})

	if item == nil || item.Item["folders"] == nil {
		return make([]models.Folder, 0), nil
	}

	if err != nil {
		return nil, err
	}

	ids := item.Item["folders"].SS
	var keys []map[string]*dynamodb.AttributeValue
	for id := range ids {
		k := map[string]*dynamodb.AttributeValue{
			"id": {S: ids[id]},
		}
		keys = append(keys, k)
	}

	items, err := instance.BatchGetItem(&dynamodb.BatchGetItemInput{
		RequestItems: map[string]*dynamodb.KeysAndAttributes{
			db.Folders(): {
				Keys: keys,
			},
		},
	})

	if err != nil {
		return nil, err
	}

	results := items.Responses[db.Folders()]

	var recs []models.Folder

	err = dynamodbattribute.UnmarshalListOfMaps(results, &recs)

	if err != nil {
		return nil, err
	}

	return recs, nil
}
