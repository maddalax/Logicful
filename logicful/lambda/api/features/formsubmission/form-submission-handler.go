package formsubmission

import (
	_ "encoding/json"
	"github.com/julienschmidt/httprouter"
	"github.com/logicful/models"
	"github.com/logicful/service/httpextensions"
	"net/http"
)

func AddHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var submission = models.Submission{}
	if !httpextensions.ReadJson(&submission, w, r) {
		return
	}
	submission.FormId = ps.ByName("formId")
	err := Add(submission)
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteNoContent(w)
}

func ListHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	submissions, err := List(ps.ByName("formId"))
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteJson(w, submissions)
}

func DeleteHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var ids []string
	if !httpextensions.ReadJson(&ids, w, r) {
		return
	}
	err := Delete(ids, ps.ByName("formId"))
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteNoContent(w)
}