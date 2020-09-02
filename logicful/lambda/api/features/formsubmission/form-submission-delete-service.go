package formsubmission

import (
	"errors"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/logicful/models"
	"github.com/logicful/service/db"
	"github.com/logicful/service/sqs"
	"os"
	"sync"
)

var instance = db.New()

func Delete(ids []string, formId string) error {

	if len(ids) == 0 {
		return nil
	}

	if len(ids) > 50 {
		return errors.New("you may only delete up to 50 entries in a single request")
	}

	allErrors := make(chan error)
	wgDone := make(chan bool)

	var wg sync.WaitGroup
	for i := range ids {
		wg.Add(1)
		go func(id string) {
			remove(formId, id, allErrors)
			wg.Done()
		}(ids[i])
	}

	go func() {
		wg.Wait()
		close(wgDone)
	}()

	select {
	case <-wgDone:
		break
	case err := <-allErrors:
		close(allErrors)
		return err
	}

	err := sqs.SendMessage(models.SubmissionsDeleted{
		FormId: formId,
		Ids:    ids,
	}, os.Getenv("FORM_SUBMISSIONS_DELETED"))

	if err != nil {
		return err
	}

	return nil
}

func remove(formId string, id string, errors chan error) {
	_, err := instance.TransactWriteItems(&dynamodb.TransactWriteItemsInput{
		TransactItems: []*dynamodb.TransactWriteItem{
			{
				Update: &dynamodb.Update{
					TableName: aws.String("forms"),
					Key: map[string]*dynamodb.AttributeValue{
						"id": {
							S: aws.String(formId),
						},
					},
					UpdateExpression: aws.String("DELETE #submissions :submission"),
					ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
						":submission": {
							SS: aws.StringSlice([]string{id}),
						},
					},
					ExpressionAttributeNames: map[string]*string{
						"#submissions": aws.String("submissions"),
					},
				},
			},
			{
				Delete: &dynamodb.Delete{
					TableName: aws.String("form_submissions"),
					Key: map[string]*dynamodb.AttributeValue{
						"id": {
							S: aws.String(id),
						},
					},
				},
			},
		},
	})
	if err != nil {
		errors <- err
		return
	}
}
