package form

import (
	"context"
	"errors"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"github.com/logicful/service/queue"
	"google.golang.org/api/iterator"
	"strings"
	"time"
)

func Set(form models.Form, user models.User) (models.Form, error) {

	form.TeamId = user.TeamId

	if form.TeamId == "" {
		return models.Form{}, errors.New("team id is required")
	}

	if form.Id == "" {
		form.Id = uuid.New().String()
	}

	if form.Folder == "" {
		form.Folder = form.TeamId + ":" + "uncategorized"
	} else {
		if !strings.HasPrefix(form.Folder, form.TeamId) {
			form.Folder = form.TeamId + ":" + form.Folder
		}
	}

	if form.CreationDate == "" {
		form.CreationDate = date.ISO8601(time.Now())
		form.CreateBy = "maddox2"
	}

	form.ChangeDate = date.ISO8601(time.Now())
	form.ChangeBy = "maddox2"

	_, err := db.Instance().Collection("forms").Doc(form.Id).Set(context.Background(), form)

	if err != nil {
		return models.Form{}, err
	}

	err = queue.Dispatch("forms", form)

	if err != nil {
		return models.Form{}, err
	}

	return form, err
}

func List(folder string) ([]models.Form, error) {
	iter := db.Instance().Collection("forms").Where("Folder", "==", folder).Documents(context.Background())
	results := make([]models.Form, 0)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		result := models.Form{}
		err = db.Unmarshal(doc.Data(), &result)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}
	return results, nil
}

func Get(id string, user models.User) (models.Form, error) {
	result, err := db.Instance().Collection("forms").Doc(id).Get(context.Background())
	if err != nil {
		return models.Form{}, err
	}
	form := models.Form{}
	err = db.Unmarshal(result.Data(), &form)
	if err != nil {
		return models.Form{}, err
	}
	return form, nil
}
