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
)

var instance = db.New()

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	formId := request.PathParameters["id"]

	item, err := instance.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String("forms"),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(formId),
			},
		},
		ProjectionExpression: aws.String("submissions"),
	})

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	if item == nil || item.Item["submissions"] == nil {
		return gateway.Ok(make([]string, 0))
	}

	submissions := item.Item["submissions"].L
	var lean []models.LeanSubmission
	err = dynamodbattribute.UnmarshalList(submissions, &lean)

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	return gateway.Ok(lean)
}

func main() {
	lambda.Start(handler)
}
