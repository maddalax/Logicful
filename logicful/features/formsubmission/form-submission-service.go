package formsubmission

import (
	"cloud.google.com/go/firestore"
	"errors"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"github.com/logicful/service/queue"
	"github.com/logicful/service/storage"
	"golang.org/x/net/context"
	"time"
)

func Add(submission models.Submission) error {

	if submission.FormId == "" {
		return errors.New("formId is required on submission")
	}

	submission.Id = uuid.New().String()

	submission.CreationDate = date.ISO8601(time.Now())
	submission.CreateBy = "maddox"
	submission.Processed = false

	err := queue.Dispatch("submissions", submission)

	if err != nil {
		return err
	}

	submissionRef := db.Instance().Collection("submissions").Doc(submission.Id)
	formRef := db.Instance().Collection("forms").Doc(submission.FormId)

	err = db.Instance().RunTransaction(context.Background(), func(ctx context.Context, tx *firestore.Transaction) error {
		err := tx.Set(submissionRef, submission)
		if err != nil {
			return err
		}
		err = tx.Update(formRef, []firestore.Update{
			{Path: "SubmissionCount", Value: firestore.Increment(1)},
		})
		if err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func List(id string) (string, error) {
	name := id + ".json"
	url, err := storage.GetUrl(name, "logicful-form-submissions", "")
	if err != nil {
		return "", err
	}
	return url, nil
}

func GetSubmissionFile(file models.File, user models.User) (string, error) {
	// todo do something w/ user.
	url, err := storage.GetUrl(file.Id, "logicful-form-assets", file.Name)
	if err != nil {
		return "", err
	}
	return url, nil
}
