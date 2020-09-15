package formsubmission

import (
	"errors"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/logicful/service/db"
)

var instance = db.New()

func Delete(ids []string, formId string) error {

	if len(ids) == 0 {
		return nil
	}

	if len(ids) > 50 {
		return errors.New("you may only delete up to 50 entries in a single request")
	}

	for _, id := range ids {
		_, err := instance.UpdateItem(&dynamodb.UpdateItemInput{
			TableName: aws.String(db.Data()),
			Key: map[string]*dynamodb.AttributeValue{
				"PK": {
					S: aws.String("FORM#" + formId),
				},
				"SK": {
					S: aws.String("SUBMISSION#" + id),
				},
			},
			UpdateExpression: aws.String("SET #status = :status, #newSubmissionKey = :newSubmissionKey, #submissionFormId = :formId, #formId = :formId"),
			ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
				":formId": {
					S: aws.String(formId),
				},
				":newSubmissionKey": {
					S: aws.String(id),
				},
				":status": {
					S: aws.String("deleted"),
				},
			},
			ExpressionAttributeNames: map[string]*string{
				"#formId":           aws.String("FormId"),
				"#submissionFormId": aws.String("SubmissionFormId"),
				"#newSubmissionKey": aws.String("NewSubmissionKey"),
				"#status":           aws.String("Status"),
			},
		})
		if err != nil {
			return err
		}
	}
	return nil
}
