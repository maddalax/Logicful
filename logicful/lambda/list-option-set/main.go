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

	item, err := instance.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("CLIENTS_TABLE")),
		Key: map[string]*dynamodb.AttributeValue{
			"name": {
				S: aws.String("maddox"),
			},
		},
		ProjectionExpression: aws.String("option_sets"),
	})

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	ids := item.Item["option_sets"].SS
	var keys []map[string]*dynamodb.AttributeValue
	for id := range ids {
		k := map[string]*dynamodb.AttributeValue{
			"id": {S: ids[id]},
		}
		keys = append(keys, k)
	}

	items, err := instance.BatchGetItem(&dynamodb.BatchGetItemInput{
		RequestItems: map[string]*dynamodb.KeysAndAttributes{
			"option_sets": {
				Keys: keys,
			},
		},
	})

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	results := items.Responses["option_sets"]

	var recs []models.OptionSet

	err = dynamodbattribute.UnmarshalListOfMaps(results, &recs)

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	return gateway.Ok(recs)
}

func main() {
	lambda.Start(handler)
}
