package folder

import (
	"cloud.google.com/go/firestore"
	"context"
	"errors"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"google.golang.org/api/iterator"
	"time"
)

func Set(folder models.Folder) (models.Folder, error) {

	if folder.TeamId == "" {
		return models.Folder{}, errors.New("team id is required")
	}

	if folder.Id == "" {
		folder.Id = uuid.New().String()
	}

	if folder.CreationDate == "" {
		folder.CreationDate = date.ISO8601(time.Now())
		folder.CreateBy = "maddox2"
	}

	folder.ChangeDate = date.ISO8601(time.Now())
	folder.ChangeBy = "maddox2"

	_, err := db.Instance().Collection("folders").Doc(folder.Id).Set(context.Background(), folder)

	if err != nil {
		return models.Folder{}, err
	}

	return folder, err
}

func Delete(id string, user models.User) error {

	children, err := hasChildren(id)
	if err != nil {
		return err
	}

	if children {
		return errors.New("must delete all child folders first")
	}

	client := db.Instance()
	batch := db.Instance().Batch()

	iter := client.Collection("forms").Where("Folder", "==", "id").Documents(context.Background())
	folder := client.Collection("folders").Doc(id)

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return err
		}
		batch.Set(doc.Ref, map[string]interface{}{
			"Folder": user.TeamId + ":" + "uncategorized",
		}, firestore.MergeAll)
	}

	batch.Delete(folder)

	_, err = batch.Commit(context.Background())

	if err != nil {
		return err
	}
	return nil
}

func List(team string) ([]models.Folder, error) {
	if team == "" {
		return nil, errors.New("team is required")
	}
	iter := db.Instance().Collection("folders").Where("TeamId", "==", team).Documents(context.Background())
	var results []models.Folder
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		result := models.Folder{}
		err = db.Unmarshal(doc.Data(), &result)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}
	return results, nil
}

func hasChildren(folder string) (bool, error) {
	iter := db.Instance().Collection("folders").Where("Parent", "==", folder).Documents(context.Background())
	doc, err := iter.Next()
	if err != nil {
		return false, err
	}
	return doc.Exists(), nil
}
