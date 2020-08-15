package s3

import (
	"bytes"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/google/uuid"
	"os"
)

func SetJson(json string, name string) (string, error) {

	if len(name) == 0 {
		id, err := uuid.NewUUID()
		if err != nil {
			return "", err
		}
		name = id.String()
	}

	endpoint := os.Getenv("S3_ENDPOINT")
	// The session the S3 Uploader will use
	conf := &aws.Config{
		Region:      aws.String("us-west-2"),
		Endpoint:    &endpoint,
		Credentials: credentials.NewStaticCredentials(os.Getenv("S3_KEY"), os.Getenv("S3_SECRET"), ""),
	}
	sess := session.Must(session.NewSession(conf))

	uploader := s3manager.NewUploader(sess)

	result, err := uploader.Upload(&s3manager.UploadInput{
		Bucket:      aws.String(os.Getenv("S3_BUCKET")),
		Key:         aws.String(name),
		ACL:         aws.String("public-read"),
		ContentType: aws.String("application/json"),
		Body:        bytes.NewReader([]byte(json)),
	})

	if err != nil {
		return "", err
	}

	return result.Location, nil
}
