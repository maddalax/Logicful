package team

import (
	"context"
	"github.com/logicful/models"
	"github.com/logicful/service/db"
)

func ByUser(user models.User) (models.Team, error) {
	iter := db.Instance().Collection("teams").Where("TeamId", "==", user.TeamId).Limit(1).Documents(context.Background())
	team := models.Team{}
	err := db.First(&team, iter)
	if err != nil {
		return models.Team{}, err
	}
	return team, nil
}
