package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"github.com/logicful/service/gateway"
	"os"
	"time"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	block := models.ContentBlock{}
	err := json.Unmarshal([]byte(request.Body), &block)

	if block.Id == "" {
		block.Id = uuid.New().String()
	}

	block.CreateTime = date.ISO8601(time.Now())
	block.ChangeTime = date.ISO8601(time.Now())
	block.CreateBy = "maddox"
	block.ChangeBy = "maddox"

	instance := db.New()

	_, err = instance.TransactWriteItems(&dynamodb.TransactWriteItemsInput{
		TransactItems: []*dynamodb.TransactWriteItem{
			{
				Update: &dynamodb.Update{
					TableName: aws.String(os.Getenv("CLIENTS_TABLE")),
					Key: map[string]*dynamodb.AttributeValue{
						"name": {
							S: aws.String("maddox"),
						},
					},
					UpdateExpression: aws.String("ADD #20e30 :20e30"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":20e30": {
							SS: aws.StringSlice([]string{block.Id}),
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#20e30": aws.String("content_blocks"),
					},
				},
			},
			{
				Update: &dynamodb.Update{
					TableName: aws.String(os.Getenv("CONTENT_BLOCKS_TABLE")),
					Key: map[string]*dynamodb.AttributeValue{
						"id": {
							S: aws.String(block.Id),
						},
					},
					UpdateExpression: aws.String("SET #c1e70 = :c1e70, #value = :value, #c1e71 = :c1e71, #c1e73 = if_not_exists(#c1e74,:c1e73), CreateBy = if_not_exists(#CreateBy,:CreateBy), ChangeBy = :ChangeBy"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":c1e70": {
							S: aws.String(block.Name),
						},
						":c1e71": {
							S: aws.String(block.ChangeTime),
						},
						":c1e73": {
							S: aws.String(block.CreateTime),
						},
						":value": {
							S: aws.String(block.Value),
						},
						":ChangeBy": {
							S: aws.String(block.ChangeBy),
						},
						":CreateBy": {
							S: aws.String(block.CreateBy),
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#c1e70":    aws.String("name"),
						"#c1e71":    aws.String("ChangeTime"),
						"#c1e73":    aws.String("CreateTime"),
						"#c1e74":    aws.String("CreateTime"),
						"#value":    aws.String("value"),
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
