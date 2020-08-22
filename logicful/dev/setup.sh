aws dynamodb create-table --cli-input-json file://./dev/tables/option_sets.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/clients.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/forms.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/content-blocks.json --endpoint-url http://localhost:8000