package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/logicful/models"
	"github.com/logicful/service/db"
	"github.com/logicful/service/gateway"
	"github.com/logicful/service/sqs"
	"os"
	"sync"
)

var instance = db.New()

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	var ids []string
	var formId = request.PathParameters["id"]

	err := json.Unmarshal([]byte(request.Body), &ids)

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	if len(ids) == 0 {
		return gateway.NoContent()
	}

	if len(ids) > 50 {
		return gateway.BadRequest("You may only delete up to 50 entries in a single request.")
	}

	errors := make(chan error)
	wgDone := make(chan bool)

	var wg sync.WaitGroup
	for i := range ids {
		wg.Add(1)
		go func(id string) {
			remove(formId, id, errors)
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
	case err := <-errors:
		close(errors)
		return gateway.BadRequest(err.Error())
	}

	err = sqs.SendMessage(models.SubmissionsDeleted{
		FormId: formId,
		Ids:    ids,
	}, os.Getenv("FORM_SUBMISSIONS_DELETED"))

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	return gateway.NoContent()
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

func main() {
	lambda.Start(handler)
}
