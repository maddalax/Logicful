package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/google/uuid"
	"github.com/logicful/service/gateway"
	"github.com/logicful/service/s3"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	id := request.QueryStringParameters["id"]
	if id == "" {
		id = uuid.New().String()
	}
	name := "maddox-" + id + ".json"
	path, err := s3.SetJson(request.Body, name)

	if err != nil {
		return gateway.BadRequest(err.Error())
	}

	return gateway.Ok(&gateway.SuccessResult{
		Message: path,
	})
}

func main() {
	lambda.Start(handler)
}
