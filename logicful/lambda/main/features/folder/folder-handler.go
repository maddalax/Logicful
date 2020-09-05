package folder

import (
	_ "encoding/json"
	"github.com/julienschmidt/httprouter"
	"github.com/logicful/models"
	"github.com/logicful/service/httpextensions"
	"net/http"
)

func SetHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var folder = models.Folder{}
	if !httpextensions.ReadJson(&folder, w, r) {
		return
	}
	folder.Id = ps.ByName("folderId")
	folder, err := Set(folder)
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteJson(w, folder)
}

func ListHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	folders, err := List()
	if err != nil {
		httpextensions.WriteError(w, err)
		return
	}
	httpextensions.WriteJson(w, folders)
}
