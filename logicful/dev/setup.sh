aws dynamodb create-table --cli-input-json file://./dev/tables/option_sets.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/clients.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/forms.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/content-blocks.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/form_submissions.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/submissions_queue_locks.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/folders.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/data.json --endpoint-url http://localhost:8000
aws dynamodb update-table --table-name data --global-secondary-index-updates

aws dynamodb update-table \
    --table-name data \
    --endpoint-url http://localhost:8000 \
    --attribute-definitions AttributeName=Folder,AttributeType=S AttributeName=FormId,AttributeType=S \
    --global-secondary-index-updates \
    "[{\"Create\":{\"IndexName\": \"FormFolderIndex\",\"KeySchema\":[{\"AttributeName\":\"Folder\",\"KeyType\":\"HASH\"}, {\"AttributeName\":\"FormId\",\"KeyType\":\"RANGE\"}], \
    \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5      },\"Projection\":{\"ProjectionType\":\"ALL\"}}}]"
