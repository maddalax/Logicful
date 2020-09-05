package main

import (
	"api/main/features/contentblock"
	"api/main/features/folder"
	"api/main/features/form"
	"api/main/features/formsubmission"
	"api/main/features/optionset"
	"api/main/features/s3store"
	"github.com/apex/gateway"
	"github.com/julienschmidt/httprouter"
	"log"
)

func main() {
	router := httprouter.New()
	addOptionSetHandlers(router)
	addContentBlockHandlers(router)
	addFormHandlers(router)
	addFolderHandlers(router)
	addSubmissionHandlers(router)
	addSetS3Handlers(router)

	log.Fatal(gateway.ListenAndServe(":3000", router))
}

func addOptionSetHandlers(router *httprouter.Router) {
	router.GET("/api/option-set", optionset.ListHandler)
	router.POST("/api/option-set", optionset.SetHandler)
	router.PUT("/api/option-set/:id", optionset.SetHandler)
}

func addContentBlockHandlers(router *httprouter.Router) {
	router.GET("/api/content-block", contentblock.ListHandler)
	router.POST("/api/content-block", contentblock.SetHandler)
	router.PUT("/api/content-block/:id", contentblock.SetHandler)
}

func addFormHandlers(router *httprouter.Router) {
	router.GET("/api/form", form.ListHandler)
	router.GET("/api/form/:formId", form.GetHandler)
	router.POST("/api/form", form.SetHandler)
	router.PUT("/api/form/:formId", form.SetHandler)
}

func addFolderHandlers(router *httprouter.Router) {
	router.GET("/api/folder", folder.ListHandler)
	router.POST("/api/folder", folder.SetHandler)
	router.PUT("/api/folder/:folderId", folder.SetHandler)
}

func addSubmissionHandlers(router *httprouter.Router) {
	router.GET("/api/form/:formId/submission", formsubmission.ListHandler)
	router.POST("/api/form/:formId/submission", formsubmission.AddHandler)
	router.DELETE("/api/form/:formId/submission", formsubmission.DeleteHandler)
}

func addSetS3Handlers(router *httprouter.Router) {
	router.POST("/api/s3/json", s3store.SetJsonHandler)
}
