package team

import (
	"api/features/user"
	"api/handler"
	_ "encoding/json"
	"github.com/julienschmidt/httprouter"
	"github.com/logicful/models"
	"github.com/logicful/service/httpextensions"
	"net/http"
)

func TeamHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	token, err := ByUser(handler.User(r))
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteJson(w, token)
}

func MembersHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	token, err := user.ByTeam(handler.User(r))
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteJson(w, token)
}

func SetHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var team = models.Team{}
	if !httpextensions.ReadJson(&team, w, r) {
		return
	}
	team.Id = ps.ByName("teamId")
	team, err := Set(team, handler.User(r))
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteJson(w, team)
}
