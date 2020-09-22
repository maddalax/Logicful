package main

import (
	"api/features/contentblock"
	"api/features/folder"
	"api/features/form"
	"api/features/formsubmission"
	"api/features/optionset"
	"api/features/s3store"
	"api/features/user"
	"api/features/workflow"
	"github.com/julienschmidt/httprouter"
	"github.com/logicful/service/db"
	"github.com/logicful/service/queue"
	"log"
	"net/http"
	"os"
)

func main() {

	db.Instance()
	queue.Setup()
	addCron()

	router := httprouter.New()

	router.GlobalOPTIONS = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Access-Control-Request-Method") != "" {
			// Set CORS headers
			header := w.Header()
			header.Set("Access-Control-Allow-Methods", header.Get("Allow"))
			header.Set("Access-Control-Allow-Origin", "*")
			header.Set("Access-Control-Allow-Headers", "*")
		}
	})

	addOptionSetHandlers(router)
	addContentBlockHandlers(router)
	addFormHandlers(router)
	addFolderHandlers(router)
	addSubmissionHandlers(router)
	addSetS3Handlers(router)
	addUserRoutes(router)

	addQueueSubscribers()

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
		log.Printf("Defaulting to port %s", port)
	}
	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		log.Fatal(err)
	}
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
	router.DELETE("/api/folder/:folderId", folder.DeleteHandler)
}

func addSubmissionHandlers(router *httprouter.Router) {
	router.GET("/api/form/:formId/submission", formsubmission.ListHandler)
	router.POST("/api/form/:formId/submission/file/:id", formsubmission.GenerateFileUrlHandler)
	router.POST("/api/form/:formId/submission", formsubmission.AddHandler)
	router.DELETE("/api/form/:formId/submission", formsubmission.DeleteHandler)
	router.PUT("/api/form/:formId/submission/mark/read", formsubmission.MarkReadHandler)
	router.GET("/api/form/:formId/submission/read", formsubmission.GetReadHandler)
}

func addSetS3Handlers(router *httprouter.Router) {
	router.POST("/api/s3/json", s3store.SetJsonHandler)
	router.POST("/api/s3/put", s3store.GenerateUrlHandler)
}

func addUserRoutes(router *httprouter.Router) {
	router.POST("/api/user/register", user.RegisterHandler)
	router.POST("/api/user/login", user.LoginHandler)
	router.POST("/api/user/refresh", user.RefreshHandler)
	router.POST("/api/user/login/google", user.LoginFromGoogleHandler)
}

func addCron() {
	formsubmission.StartProcessor()
}

func addQueueSubscribers() {
	workflow.Register()
}
