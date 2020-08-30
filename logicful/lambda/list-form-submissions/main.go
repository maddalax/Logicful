package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/logicful/models"
	"github.com/logicful/service/db"
	"github.com/logicful/service/gateway"
	"github.com/logicful/service/storage"
)

var instance = db.New()

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	formId := request.PathParameters["id"]

	submissions, err := currentSubmissions(formId + ".json")

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	return gateway.Ok(submissions)
}

func currentSubmissions(name string) ([]models.Submission, error) {
	bytes, err := storage.DownloadToBytes("logicful-form-submissions", name)
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

func main() {
	lambda.Start(handler)
}
