package optionset

import (
	_ "encoding/json"
	"github.com/julienschmidt/httprouter"
	"github.com/logicful/models"
	"github.com/logicful/service/httpextensions"
	"net/http"
)

func SetHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var set = models.OptionSet{}
	if !httpextensions.ReadJson(set, w, r) {
		return
	}
	set.Id = ps.ByName("id")
	err := Set(set)
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteNoContent(w)
}

func ListHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	sets, err := List()
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteJson(w, sets)
}
