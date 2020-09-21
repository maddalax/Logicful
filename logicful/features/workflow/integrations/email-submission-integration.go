package integrations

import (
	"encoding/json"
	"github.com/logicful/models"
	"github.com/logicful/service/emailer"
	"github.com/logicful/service/queue"
)

func RegisterEmail() {
	queue.Receive("send-submission-email", func(message []byte) error {
		var result models.Integration
		err := json.Unmarshal(message, &result)
		if err != nil {
			return err
		}
		return sendSubmissionEmail(result)
	})
}

func sendSubmissionEmail(submission models.Integration) error {
	println("Sending email: " + submission.Submission.Id + " " + submission.Config["to"])
	err := emailer.Send(emailer.Email{
		To:       "admin@logicful.org",
		HtmlBody: "You received a new submission",
		From:     "maddox@logicful.org",
		Subject:  "New Submission " + submission.Submission.Id,
	})
	if err != nil {
		return err
	}
	return nil
}
