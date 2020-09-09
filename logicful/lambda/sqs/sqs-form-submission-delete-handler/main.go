package main

import (
	"context"
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/db"
	"github.com/logicful/service/storage"
	"strconv"
	"time"
)

var instance = db.New()

func handler(ctx context.Context, sqsEvent events.SQSEvent) error {
	worker := uuid.New().String()
	for _, message := range sqsEvent.Records {
		submission := models.SubmissionsDeleted{}
		err := json.Unmarshal([]byte(message.Body), &submission)
		if err != nil {
			return err
		}
		err = acquireLock(submission.FormId, worker)
		if err != nil {
			return err
		}
		err = onSubmission(submission)
		if err != nil {
			_ = releaseLock(submission.FormId, worker)
			return err
		}
		_ = releaseLock(submission.FormId, worker)
	}
	return nil
}

func onSubmission(submission models.SubmissionsDeleted) error {
	name := submission.FormId + ".json"
	current, err := currentSubmissions(name)
	if err != nil {
		return err
	}

	ids := make(map[string]bool)
	for i := range submission.Ids {
		id := submission.Ids[i]
		ids[id] = true
	}

	submission.Ids = make([]string, 0)

	println(len(current))
	i := 0
	for _, x := range current {
		_, exists := ids[x.Id]
		if !exists {
			current[i] = x
			i++
		}
	}
	current = current[:i]

	_, err = storage.SetJson(current, name, "logicful-folder-submissions", "private")

	if err != nil {
		return err
	}

	return nil
}

func currentSubmissions(name string) ([]models.Submission, error) {
	bytes, err := storage.DownloadToBytes("logicful-folder-submissions", name)
	if err != nil {
		return nil, err
	}
	if bytes == nil {
		return make([]models.Submission, 0), nil
	}

	var submissions []models.Submission
	err = json.Unmarshal(bytes, &submissions)

	if err != nil {
		return nil, err
	}

	return submissions, nil
}

func acquireLock(formId string, worker string) error {
	threeMinutesAgo := time.Now().Add(time.Duration(-3) * time.Minute).Unix()
	_, err := instance.PutItem(&dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(formId),
			},
			"active": {
				BOOL: aws.Bool(true),
			},
			"worker": {
				S: aws.String(worker),
			},
			"timestamp": {
				N: aws.String(strconv.FormatInt(time.Now().Unix(), 10)),
			},
		},
		ConditionExpression: aws.String("active = :false Or NOT (attribute_exists(active)) Or #timestamp <= :threeMinsAgo"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":false": {
				BOOL: aws.Bool(false),
			},
			":threeMinsAgo": {
				N: aws.String(strconv.FormatInt(threeMinutesAgo, 10)),
			},
		},
		ExpressionAttributeNames: map[string]*string{
			"#timestamp": aws.String("timestamp"),
		},
		TableName: aws.String(db.SubmissionQueueLocks()),
	})
	if err != nil {
		return err
	}
	return nil
}

func releaseLock(formId string, worker string) error {
	_, err := instance.DeleteItem(&dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(formId),
			},
		},
		ConditionExpression: aws.String("worker = :worker"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":worker": {
				S: aws.String(worker),
			},
		},
		TableName: aws.String(db.SubmissionQueueLocks()),
	})
	if err != nil {
		return err
	}
	return nil
}

func main() {
	lambda.Start(handler)
}
