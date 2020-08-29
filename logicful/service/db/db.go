package db

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"os"
)

func New() *dynamodb.DynamoDB {
	conf := aws.Config{
		Region: aws.String(os.Getenv("DYNAMO_REGION")),
	}
	local := os.Getenv("DYNAMO_IS_LOCAL")
	println("LOCAL: " + local)
	if local == "true" {
		conf.Endpoint = aws.String(os.Getenv("DYNAMO_ENDPOINT"))
	}
	println(os.Getenv("DYNAMO_ENDPOINT"))
	sess := session.Must(session.NewSession())
	// Create a DynamoDB client with additional configuration
	return dynamodb.New(sess, &conf)
}
