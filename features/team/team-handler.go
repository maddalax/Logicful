package team

import (
	"api/features/user"
	"api/handler"
	_ "encoding/json"
	"github.com/julienschmidt/httprouter"
	"github.com/logicful/service/httpextensions"
	"net/http"
)

func TeamHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	token, err := user.ByTeam(handler.User(r))
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
