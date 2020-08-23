package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"github.com/logicful/service/gateway"
	"time"
)

var instance = db.New()

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	form := models.Form{}
	err := json.Unmarshal([]byte(request.Body), &form)

	if form.Id == "" {
		form.Id = uuid.New().String()
	}

	form.CreateTime = date.ISO8601(time.Now())
	form.ChangeTime = date.ISO8601(time.Now())
	form.CreateBy = "maddox"
	form.ChangeBy = "maddox"

	fields, err := dynamodbattribute.Marshal(form.Fields)

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	_, err = instance.TransactWriteItems(&dynamodb.TransactWriteItemsInput{
		TransactItems: []*dynamodb.TransactWriteItem{
			{
				Update: &dynamodb.Update{
					TableName: aws.String("clients"),
					Key: map[string]*dynamodb.AttributeValue{
						"name": {
							S: aws.String("maddox"),
						},
					},
					UpdateExpression: aws.String("ADD #20e30 :20e30"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":20e30": {
							SS: aws.StringSlice([]string{form.Id}),
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#20e30": aws.String("forms"),
					},
				},
			},
			{
				Update: &dynamodb.Update{
					TableName: aws.String("forms"),
					Key: map[string]*dynamodb.AttributeValue{
						"id": {
							S: aws.String(form.Id),
						},
					},
					UpdateExpression: aws.String("SET #c1e70 = :c1e70, #c1e71 = :c1e71, #c1e72 = :c1e72, #c1e73 = if_not_exists(#c1e74,:c1e73), CreateBy = if_not_exists(#CreateBy,:CreateBy), ChangeBy = :ChangeBy"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":c1e70": {
							S: aws.String(form.Name),
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
						"#c1e70":    aws.String("Name"),
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
		return gateway.BadRequest(err.Error())
	}

	return gateway.NoContent()
}

func main() {
	lambda.Start(handler)
}
