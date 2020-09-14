package formsubmission

import (
	"encoding/json"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/debug"
	"github.com/logicful/service/distributedlock"
	"github.com/logicful/service/storage"
)

func Process(submission models.Submission) error {
	debug.Debug(submission)
	worker := uuid.New().String()
	err := distributedlock.Acquire(submission.FormId, worker)
	if err != nil {
		return err
	}
	err = onSubmission(submission)
	if err != nil {
		_ = distributedlock.Release(submission.FormId, worker)
		return err
	}
	_ = distributedlock.Release(submission.FormId, worker)
	return nil
}

func onSubmission(submission models.Submission) error {
	name := submission.FormId + ".json"
	current, err := currentSubmissions(name)
	if err != nil {
		return err
	}

	println(len(current))

	if submission.Status == "deleted" {
		var before = len(current)
		current = removeFromArray(current, submission)
		if (len(current)) == before {
			println("already deleted.")
			return nil
		}
	} else {
		// Already exists, just return.
		for i := range current {
			if current[i].Id == submission.Id {
				println("already exists.")
				return nil
			}
		}
		current = append(current, submission)
	}

	_, err = storage.SetJson(current, name, "logicful-folder-submissions", "private")

	if err != nil {
		return err
	}

	return nil
}

func currentSubmissions(name string) ([]models.Submission, error) {
	bytes, err := storage.DownloadToBytes("logicful-folder-submissions", name)
	if err != nil {
		return nil, err
	}
	if bytes == nil {
		return make([]models.Submission, 0), nil
	}

	var submissions []models.Submission
	err = json.Unmarshal(bytes, &submissions)

	if err != nil {
		return nil, err
	}

	return submissions, nil
}

func removeFromArray(s []models.Submission, submission models.Submission) []models.Submission {
	i := 0
	for _, x := range s {
		if x.Id != submission.Id {
			s[i] = x
			i++
		}
	}
	s = s[:i]
	return s
}
