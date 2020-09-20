package queue

import (
	"encoding/json"
	"golang.org/x/net/context"
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
	setupSubscription("form", "form-processor")
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
