package user

import (
	"github.com/julienschmidt/httprouter"
	"github.com/logicful/models"
	"github.com/logicful/service/httpextensions"
	"net/http"
	"strings"
)

func RegisterHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var user = models.User{}
	if !httpextensions.ReadJson(&user, w, r) {
		return
	}
	err := Register(user)
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteNoContent(w)
}

func LoginHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var user = models.User{}
	if !httpextensions.ReadJson(&user, w, r) {
		return
	}
	token, err := Login(user)
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteJson(w, token)
}

func MeHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var token = r.Header.Get("Authorization")
	token = strings.Replace(token, "Bearer ", "", 1)
	token = strings.TrimSpace(token)
	user := ByToken(token)
	httpextensions.WriteJson(w, user)
}

func RefreshHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var token = r.Header.Get("Authorization")
	token = strings.Replace(token, "Bearer ", "", 1)
	token = strings.TrimSpace(token)
	refreshed := RefreshToken(token)
	httpextensions.WriteJson(w, refreshed)
}
