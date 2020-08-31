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
	"github.com/logicful/service/sqs"
	"os"
	"time"
)

var instance = db.New()

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	submission := models.Submission{}
	submission.FormId = request.PathParameters["id"]
	submission.Id = uuid.New().String()
	err := json.Unmarshal([]byte(request.Body), &submission)

	submission.CreateTime = date.ISO8601(time.Now())
	submission.CreateBy = "maddox"

	details, err := dynamodbattribute.Marshal(submission.Details)

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	fieldMeta, err := dynamodbattribute.Marshal(submission.FieldMeta)

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	meta, err := dynamodbattribute.Marshal(submission.Meta)

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	lean, err := dynamodbattribute.Marshal([]models.LeanSubmission{{
		Id: submission.Id,
		Creatable: models.Creatable{
			CreateTime: submission.CreateTime,
			CreateBy:   "maddox",
		},
	}})

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	emptyList := make([]*dynamodb.AttributeValue, 0)

	_, err = instance.TransactWriteItems(&dynamodb.TransactWriteItemsInput{
		TransactItems: []*dynamodb.TransactWriteItem{
			{
				Update: &dynamodb.Update{
					TableName: aws.String("forms"),
					Key: map[string]*dynamodb.AttributeValue{
						"id": {
							S: aws.String(submission.FormId),
						},
					},
					UpdateExpression: aws.String("SET #submissions = list_append(if_not_exists(#submissions, :empty_list), :submission)"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":submission": lean,
						":empty_list": {
							L: emptyList,
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#submissions": aws.String("submissions"),
					},
				},
			},
			{
				Update: &dynamodb.Update{
					TableName: aws.String("form_submissions"),
					Key: map[string]*dynamodb.AttributeValue{
						"id": {
							S: aws.String(submission.Id),
						},
					},
					UpdateExpression: aws.String("SET #details = :details, #fieldMeta = :fieldMeta, #meta = :meta, #formId = :formId, #createBy = :createBy, #createTime = :createTime"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":details":   details,
						":fieldMeta": fieldMeta,
						":meta":      meta,
						":formId": {
							S: aws.String(submission.FormId),
						},
						":createBy": {
							S: aws.String(submission.CreateBy),
						},
						":createTime": {
							S: aws.String(submission.CreateTime),
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#details":    aws.String("Details"),
						"#formId":     aws.String("FormId"),
						"#createBy":   aws.String("CreateBy"),
						"#createTime": aws.String("CreateTime"),
						"#fieldMeta":  aws.String("FieldMeta"),
						"#meta":       aws.String("Meta"),
					},
				},
			},
		},
	})

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	err = sqs.SendMessage(submission, os.Getenv("FORM_SUBMISSION_QUEUE"))
	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	return gateway.NoContent()
}

func main() {
	lambda.Start(handler)
}
