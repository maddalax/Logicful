package team

import (
	"context"
	"github.com/google/uuid"
	"github.com/logicful/models"
	"github.com/logicful/service/date"
	"github.com/logicful/service/db"
	"time"
)

func ByUser(user models.User) (models.Team, error) {
	iter := db.Instance().Collection("teams").Where("Id", "==", user.TeamId).Limit(1).Documents(context.Background())
	team := models.Team{}
	err := db.First(&team, iter)
	if err != nil {
		return models.Team{}, err
	}
	return team, nil
}

func Set(team models.Team, user models.User) (models.Team, error) {

	if team.Id == "" {
		team.Id = uuid.New().String()
	}

	if team.CreationDate == "" {
		team.CreationDate = date.ISO8601(time.Now())
		team.CreateBy = user.DisplayName
	}

	team.ChangeDate = date.ISO8601(time.Now())
	team.ChangeBy = user.DisplayName

	_, err := db.Instance().Collection("teams").Doc(team.Id).Set(context.Background(), team)

	if err != nil {
		return models.Team{}, err
	}

	return team, err
}
