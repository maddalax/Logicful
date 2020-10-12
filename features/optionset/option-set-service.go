package optionset

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

var instance = db.Instance()

func Set(set models.OptionSet) error {

	if set.Id == "" {
		set.Id = uuid.New().String()
	}

	if set.CreationDate == "" {
		set.CreationDate = date.ISO8601(time.Now())
		set.CreateBy = "maddox"
	}

	set.ChangeDate = date.ISO8601(time.Now())
	set.ChangeBy = "maddox"

	_, err := instance.Collection("option_sets").Doc(set.Id).Set(context.Background(), set)

	if err != nil {
		return err
	}

	return nil
}

func List(team string) ([]models.OptionSet, error) {
	if team == "" {
		return nil, errors.New("team is required")
	}
	iter := db.Instance().Collection("option_sets").Where("TeamId", "==", team).Documents(context.Background())
	var results = make([]models.OptionSet, 0)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		result := models.OptionSet{}
		err = db.Unmarshal(doc.Data(), &result)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}
	return results, nil
}
