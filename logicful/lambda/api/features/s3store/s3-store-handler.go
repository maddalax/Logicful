package s3store

import (
	"github.com/julienschmidt/httprouter"
	"github.com/logicful/service/httpextensions"
	"io/ioutil"
	"net/http"
)

func SetJsonHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	bytes, err := ioutil.ReadAll(r.Body)
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	url, err := SetJson(httpextensions.Query("id", r), bytes)
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteJson(w, httpextensions.SuccessResult{
		Message: url,
	})
}
