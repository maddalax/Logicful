require (
	github.com/apex/gateway v1.1.1
	github.com/aws/aws-sdk-go v1.34.5
	github.com/google/uuid v1.1.1
	github.com/julienschmidt/httprouter v1.3.0
	github.com/logicful/models v0.0.0-00010101000000-000000000000
	github.com/logicful/service v0.0.0-00010101000000-000000000000
	github.com/tj/assert v0.0.3 // indirect
)

module api

go 1.15

replace github.com/logicful/service => ./../../service

replace github.com/logicful/models => ./../../models
