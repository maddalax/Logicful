package main

import (
	"context"
	"encoding/json"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/db"
	"github.com/logicful/service/distributedlock"
	"github.com/logicful/service/storage"
)

var instance = db.New()

func HandleRequest(ctx context.Context) error {
	submissions, err := Unprocessed()
	if len(submissions) == 0 {
		return nil
	}
	worker := uuid.New().String()
	err = distributedlock.Acquire("process_submissions", worker)
	if err != nil {
		return err
	}
	formMap := make(map[string][]models.Submission)
	for _, sub := range submissions {
		if sub.FormId == "" || sub.Id == "" {
			continue
		}
		if formMap[sub.FormId] == nil {
			formMap[sub.FormId] = make([]models.Submission, 1)
		}
		formMap[sub.FormId] = append(formMap[sub.FormId], sub)
	}
	for s := range formMap {
		err := ProcessForm(s, formMap[s])
		if err != nil {
			_ = distributedlock.Release("process_submissions", worker)
			return err
		}
	}
	_ = distributedlock.Release("process_submissions", worker)
	return nil
}

func ProcessForm(formId string, submissions []models.Submission) error {
	name := formId + ".json"
	current, err := currentSubmissions(name)
	if err != nil {
		return err
	}
	for _, submission := range submissions {
		if submission.Status == "deleted" {
			var before = len(current)
			current = removeFromArray(current, submission)
			if (len(current)) == before {
				println("already deleted.")
				continue
			}
		} else {
			// Already exists, just return.
			for i := range current {
				if current[i].Id == submission.Id {
					println("already exists.")
					continue
				}
			}
			current = append(current, submission)
		}
	}

	for _, submission := range current {
		if submission.Id == "" {
			current = removeFromArray(current, submission)
		}
	}

	_, err = storage.SetJson(current, name, "logicful-form-submissions", "private")

	if err != nil {
		return err
	}

	SetUnprocessed(submissions)

	return nil
}

func currentSubmissions(name string) ([]models.Submission, error) {
	bytes, err := storage.DownloadToBytes("logicful-form-submissions", name)
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

func SetUnprocessed(submissions []models.Submission) {
	for _, submission := range submissions {
		if submission.Id == "" {
			continue
		}
		println("Updadting: " + submission.Id)
		_, err := db.New().UpdateItem(&dynamodb.UpdateItemInput{
			TableName: aws.String(db.Data()),
			Key: map[string]*dynamodb.AttributeValue{
				"PK": {
					S: aws.String("FORM#" + submission.FormId),
				},
				"SK": {
					S: aws.String("SUBMISSION#" + submission.Id),
				},
			},
			UpdateExpression: aws.String("REMOVE #newSubmissionKey"),
			ExpressionAttributeNames: map[string]*string{
				"#newSubmissionKey": aws.String("NewSubmissionKey"),
			},
		})

		if err != nil {
			println(err.Error())
			continue
		}
	}
}

func Unprocessed() ([]models.Submission, error) {
	results, err := instance.Scan(&dynamodb.ScanInput{
		TableName:        aws.String(db.Data()),
		IndexName:        aws.String("UnprocessedSubmissionsIndex"),
		FilterExpression: aws.String("attribute_exists(FormId)"),
	})
	if err != nil {
		return nil, err
	}
	var submissions []models.Submission
	err = dynamodbattribute.UnmarshalListOfMaps(results.Items, &submissions)
	if err != nil {
		return nil, err
	}
	return submissions, nil
}

func removeFromArray(s []models.Submission, submission models.Submission) []models.Submission {
	i := 0
	for _, x := range s {
		if x.Id != submission.Id {
			s[i] = x
			i++
		}
	}
	s = s[:i]
	return s
}

func main() {
	lambda.Start(HandleRequest)
}
