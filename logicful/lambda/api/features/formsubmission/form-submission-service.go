package formsubmission

import (
	"encoding/json"
	"errors"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"github.com/logicful/service/sqs"
	"github.com/logicful/service/storage"
	"os"
	"time"
)

func Add(submission models.Submission) error {

	if submission.FormId == "" {
		return errors.New("formId is required on submission")
	}

	submission.Id = uuid.New().String()

	submission.CreateTime = date.ISO8601(time.Now())
	submission.CreateBy = "maddox"

	details, err := dynamodbattribute.Marshal(submission.Details)

	if err != nil {
		return err
	}

	fieldMeta, err := dynamodbattribute.Marshal(submission.FieldMeta)

	if err != nil {
		return err
	}

	meta, err := dynamodbattribute.Marshal(submission.Meta)

	if err != nil {
		return err
	}

	_, err = db.New().TransactWriteItems(&dynamodb.TransactWriteItemsInput{
		TransactItems: []*dynamodb.TransactWriteItem{
			{
				Update: &dynamodb.Update{
					TableName: aws.String("forms"),
					Key: map[string]*dynamodb.AttributeValue{
						"id": {
							S: aws.String(submission.FormId),
						},
					},
					UpdateExpression: aws.String("ADD #submissions :submission"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":submission": {
							SS: aws.StringSlice([]string{submission.Id}),
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
		return err
	}

	err = sqs.SendMessage(submission, os.Getenv("FORM_SUBMISSION_QUEUE"))
	if err != nil {
		return err
	}

	return nil
}

func List(id string) ([]models.Submission, error) {
	bytes, err := storage.DownloadToBytes("logicful-form-submissions", id+".json")
	if aerr, ok := err.(awserr.Error); ok {
		switch aerr.Code() {
		case s3.ErrCodeNoSuchKey:
			return make([]models.Submission, 0), nil
		default:
			return nil, err
		}
	}
	var submissions []models.Submission
	err = json.Unmarshal(bytes, &submissions)
	if err != nil {
		return nil, err
	}
	return submissions, nil
}
