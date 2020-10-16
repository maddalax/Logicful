package queue

import (
	"encoding/json"
	"golang.org/x/net/context"
	"log"
)
import "cloud.google.com/go/pubsub"

var client *pubsub.Client

func Instance() (*pubsub.Client, error) {
	if client != nil {
		return client, nil
	}
	var err error
	client, err = pubsub.NewClient(context.Background(), "logicful-290101")
	if err != nil {
		return nil, err
	}
	return client, nil
}

func Setup() {
	setupTopic("form")
	setupTopic("submissions")
	setupTopic("integration-email")
	setupTopic("integration-webhook")
	setupSubscription("form", "form-processor")
	setupSubscription("submissions", "workflow")
	setupSubscription("integration-email", "send-submission-email")
	setupSubscription("integration-webhook", "send-submission-webhook")
}

func setupTopic(name string) {
	client, err := Instance()
	if err != nil {
		panic(err)
	}
	exists, err := client.Topic(name).Exists(context.Background())
	if err != nil {
		panic(err)
	}
	if !exists {
		_, err := client.CreateTopic(context.Background(), name)
		if err != nil {
			panic(err)
		}
	}
}

func setupSubscription(topic string, subscriber string) {
	client, err := Instance()
	if err != nil {
		panic(err)
	}
	exists, err := client.Subscription(subscriber).Exists(context.Background())
	if err != nil {
		panic(err)
	}
	if !exists {
		_, err := client.CreateSubscription(context.Background(), subscriber, pubsub.SubscriptionConfig{
			Topic: GetTopic(topic),
		})
		if err != nil {
			panic(err)
		}
	}
}

func GetTopic(name string) *pubsub.Topic {
	return client.Topic(name)
}

func Dispatch(name string, data interface{}) error {
	client, err := Instance()
	if err != nil {
		return err
	}
	serialized, err := json.Marshal(data)
	if err != nil {
		return err
	}
	topic := client.Topic(name)
	topic.Publish(context.Background(), &pubsub.Message{
		Data: serialized,
	})
	return nil
}

func Receive(subscription string, cb func([]byte) error) {
	client, err := Instance()
	if err != nil {
		log.Fatal(err.Error())
	}
	sub := client.Subscription(subscription)
	go func() {
		err = sub.Receive(context.Background(), func(ctx context.Context, message *pubsub.Message) {
			err = cb(message.Data)
			if err != nil {
				println(err.Error())
				message.Nack()
				return
			}
			message.Ack()
		})
		if err != nil {
			println(err.Error())
		}
	}()
}
