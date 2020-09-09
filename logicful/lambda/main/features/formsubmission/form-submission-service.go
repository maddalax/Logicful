package formsubmission

import (
	"encoding/json"
	"errors"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	searcher "github.com/logicful/service/search"
	"time"
)

func Add(submission models.Submission) error {

	if submission.FormId == "" {
		return errors.New("formId is required on submission")
	}

	submission.Id = uuid.New().String()

	submission.CreationDate = date.ISO8601(time.Now())
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

	_, err = db.New().UpdateItem(&dynamodb.UpdateItemInput{
		TableName: aws.String(db.Data()),
		Key: map[string]*dynamodb.AttributeValue{
			"PK": {
				S: aws.String("FORM#" + submission.FormId),
			},
			"SK": {
				S: aws.String("SUBMISSION#" + submission.Id),
			},
		},
		UpdateExpression: aws.String("SET #details = :details, #fieldMeta = :fieldMeta, #meta = :meta, #createBy = :createBy, #createTime = :createTime, #submissionFormId = :formId"),
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
				S: aws.String(submission.CreationDate),
			},
		},
		ExpressionAttributeNames: map[string]*string{
			"#details":          aws.String("Details"),
			"#createBy":         aws.String("CreateBy"),
			"#createTime":       aws.String("CreationDate"),
			"#fieldMeta":        aws.String("FieldMeta"),
			"#meta":             aws.String("Meta"),
			"#submissionFormId": aws.String("SubmissionFormId"),
		},
	})

	if err != nil {
		return err
	}

	//err = sqs.SendMessage(submission, os.Getenv("FORM_SUBMISSION_QUEUE"))
	//if err != nil {
	//return err
	//}
	marshaled, _ := json.Marshal(submission)
	_, err = searcher.Index(submission.FormId+"-submissions", submission.Id, string(marshaled))
	if err != nil {
		return err
	}

	return nil
}

func List(id string, query string) ([]models.Submission, error) {
	search, err := searcher.Search(id+"-submissions", query)
	if err != nil {
		return nil, err
	}
	if len(search) > 0 {
		var results []models.Submission
		for _, s := range search {
			var sub = models.Submission{}
			err := json.Unmarshal([]byte(s), &sub)
			if err != nil {
				continue
			}
			results = append(results, sub)
		}
		return results, nil
	}
	results, err := db.New().Query(&dynamodb.QueryInput{
		TableName:              aws.String(db.Data()),
		KeyConditionExpression: aws.String("SubmissionFormId = :id"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {S: aws.String(id)},
		},
		IndexName:        aws.String("SubmissionsByDate"),
		ScanIndexForward: aws.Bool(false),
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
