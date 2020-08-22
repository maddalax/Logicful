package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/logicful/models"
	"github.com/logicful/service/db"
	"github.com/logicful/service/gateway"
	"os"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	instance := db.New()
	field := "content_blocks"

	item, err := instance.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("CLIENTS_TABLE")),
		Key: map[string]*dynamodb.AttributeValue{
			"name": {
				S: aws.String("maddox"),
			},
		},
		ProjectionExpression: aws.String(field),
	})

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	if item == nil || item.Item[field] == nil {
		return gateway.Ok(make([]string, 0))
	}

	ids := item.Item[field].SS
	var keys []map[string]*dynamodb.AttributeValue
	for id := range ids {
		k := map[string]*dynamodb.AttributeValue{
			"id": {S: ids[id]},
		}
		keys = append(keys, k)
	}

	items, err := instance.BatchGetItem(&dynamodb.BatchGetItemInput{
		RequestItems: map[string]*dynamodb.KeysAndAttributes{
			field: {
				Keys: keys,
			},
		},
	})

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	results := items.Responses[field]

	var recs []models.ContentBlock

	err = dynamodbattribute.UnmarshalListOfMaps(results, &recs)

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	return gateway.Ok(recs)
}

func main() {
	lambda.Start(handler)
}
