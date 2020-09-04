package main

import (
	"api/features/contentblock"
	"api/features/form"
	"api/features/formsubmission"
	"api/features/optionset"
	"api/features/s3store"
	"github.com/apex/gateway"
	"github.com/julienschmidt/httprouter"
	"log"
)

func main() {
	router := httprouter.New()
	addOptionSetHandlers(router)
	addContentBlockHandlers(router)
	addFormHandlers(router)
	addSubmissionHandlers(router)
	addSetS3Handlers(router)

	log.Fatal(gateway.ListenAndServe(":3001", router))
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

func addSubmissionHandlers(router *httprouter.Router) {
	router.GET("/api/form/:formId/submission", formsubmission.ListHandler)
	router.POST("/api/form/:formId/submission", formsubmission.AddHandler)
	router.DELETE("/api/form/:formId/submission", formsubmission.DeleteHandler)
}

func addSetS3Handlers(router *httprouter.Router) {
	router.POST("/api/s3/json", s3store.SetJsonHandler)
}
