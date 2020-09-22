package form

import (
	"context"
	"errors"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"google.golang.org/api/iterator"
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

func Get(id string) (models.Form, error) {
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

func GetWorkflow(id string) (models.Form, error) {
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
