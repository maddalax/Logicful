package formsubmission

import (
	"errors"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"time"
)

func Add(submission models.Submission) error {

	if submission.FormId == "" {
		return errors.New("formId is required on submission")
	}

	submission.Id = uuid.New().String()

	submission.CreationDate = date.ISO8601(time.Now())
	submission.CreateBy = "maddox"
	submission.NewSubmissionKey = uuid.New().String()

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
		UpdateExpression: aws.String("SET #id = :id, #newSubmissionKey = :newSubmissionKey, #details = :details, #fieldMeta = :fieldMeta, #meta = :meta, #createBy = :createBy, #createTime = :createTime, #submissionFormId = :formId, #formId = :formId"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":details":   details,
			":fieldMeta": fieldMeta,
			":meta":      meta,
			":id": {
				S: aws.String(submission.Id),
			},
			":formId": {
				S: aws.String(submission.FormId),
			},
			":createBy": {
				S: aws.String(submission.CreateBy),
			},
			":createTime": {
				S: aws.String(submission.CreationDate),
			},
			":newSubmissionKey": {
				S: aws.String(submission.NewSubmissionKey),
			},
		},
		ExpressionAttributeNames: map[string]*string{
			"#id":               aws.String("Id"),
			"#details":          aws.String("Details"),
			"#createBy":         aws.String("CreateBy"),
			"#createTime":       aws.String("CreationDate"),
			"#fieldMeta":        aws.String("FieldMeta"),
			"#meta":             aws.String("Meta"),
			"#formId":           aws.String("FormId"),
			"#submissionFormId": aws.String("SubmissionFormId"),
			"#newSubmissionKey": aws.String("NewSubmissionKey"),
		},
	})

	if err != nil {
		return err
	}

	go Process(submission)

	return nil
}

func List(id string, query string) ([]models.Submission, error) {
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

func Unprocessed() ([]models.Submission, error) {
	results, err := db.New().Scan(&dynamodb.ScanInput{
		TableName: aws.String(db.Data()),
		IndexName: aws.String("UnprocessedSubmissionsIndex"),
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
