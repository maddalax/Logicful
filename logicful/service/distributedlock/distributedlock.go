package distributedlock

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/logicful/service/db"
	"strconv"
	"time"
)

func Acquire(key string, worker string) error {
	threeMinutesAgo := time.Now().Add(time.Duration(-3) * time.Minute).Unix()
	_, err := db.New().PutItem(&dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(key),
			},
			"active": {
				BOOL: aws.Bool(true),
			},
			"worker": {
				S: aws.String(worker),
			},
			"timestamp": {
				N: aws.String(strconv.FormatInt(time.Now().Unix(), 10)),
			},
		},
		ConditionExpression: aws.String("active = :false Or NOT (attribute_exists(active)) Or #timestamp <= :threeMinsAgo"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":false": {
				BOOL: aws.Bool(false),
			},
			":threeMinsAgo": {
				N: aws.String(strconv.FormatInt(threeMinutesAgo, 10)),
			},
		},
		ExpressionAttributeNames: map[string]*string{
			"#timestamp": aws.String("timestamp"),
		},
		TableName: aws.String(db.DistributedLocks()),
	})
	if err != nil {
		return err
	}
	return nil
}

func Release(key string, worker string) error {
	_, err := db.New().DeleteItem(&dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(key),
			},
		},
		ConditionExpression: aws.String("worker = :worker"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":worker": {
				S: aws.String(worker),
			},
		},
		TableName: aws.String(db.DistributedLocks()),
	})
	if err != nil {
		return err
	}
	return nil
}
