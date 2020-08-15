package gateway

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
)

type ErrorResult struct {
	Message string `json:"message"`
}

type SuccessResult struct {
	Message string `json:"message"`
}

func NoContent() (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                   "application/json",
			"Access-Control-Allow-Origin":    "*",
			"Access-Control-Request-Method":  "*",
			"Access-Control-Request-Headers": "*",
		},
		StatusCode: 204,
	}, nil
}

func Ok(body interface{}) (events.APIGatewayProxyResponse, error) {
	data, err := json.Marshal(body)
	if err != nil {
		return InternalError(err)
	}
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                   "application/json",
			"Access-Control-Allow-Origin":    "*",
			"Access-Control-Request-Method":  "*",
			"Access-Control-Request-Headers": "*",
		},
		Body:       string(data),
		StatusCode: 200,
	}, nil
}

func InternalError(err error) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                   "application/json",
			"Access-Control-Allow-Origin":    "*",
			"Access-Control-Request-Method":  "*",
			"Access-Control-Request-Headers": "*",
		},
		Body:       err.Error(),
		StatusCode: 500,
	}, nil
}

func BadRequest(message string) (events.APIGatewayProxyResponse, error) {
	data, err := json.Marshal(&ErrorResult{
		Message: message,
	})
	if err != nil {
		return InternalError(err)
	}
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                   "application/json",
			"Access-Control-Allow-Origin":    "*",
			"Access-Control-Request-Method":  "*",
			"Access-Control-Request-Headers": "*",
		},
		Body:       string(data),
		StatusCode: 400,
	}, nil
}
