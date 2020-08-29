package storage

import (
	"bytes"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"os"
)

func SetJson(json string, name string, bucket string, acl string) (string, error) {

	uploader := s3manager.NewUploader(createSession())

	result, err := uploader.Upload(&s3manager.UploadInput{
		Bucket:      aws.String(bucket),
		Key:         aws.String(name),
		ACL:         aws.String(acl),
		ContentType: aws.String("application/json"),
		Body:        bytes.NewReader([]byte(json)),
	})

	if err != nil {
		return "", err
	}

	return result.Location, nil
}

func DownloadToBytes(bucket string, key string) ([]byte, error) {
	downloader := s3manager.NewDownloader(createSession())
	buff := &aws.WriteAtBuffer{}
	_, err := downloader.Download(buff, &s3.GetObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		return nil, err
	}
	return buff.Bytes(), nil
}

func createSession() *session.Session {
	endpoint := os.Getenv("S3_ENDPOINT")
	// The session the S3 Uploader will use
	conf := &aws.Config{
		Region:      aws.String("us-west-2"),
		Endpoint:    &endpoint,
		Credentials: credentials.NewStaticCredentials(os.Getenv("S3_KEY"), os.Getenv("S3_SECRET"), ""),
	}
	return session.Must(session.NewSession(conf))
}
