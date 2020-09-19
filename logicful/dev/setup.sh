aws dynamodb create-table --cli-input-json file://./dev/tables/option_sets.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/content-blocks.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/submissions_queue_locks.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://./dev/tables/data.json --endpoint-url http://localhost:8000
aws dynamodb update-table --table-name data --global-secondary-index-updates

aws dynamodb update-table \
    --table-name data \
    --endpoint-url http://localhost:8000 \
    --attribute-definitions AttributeName=Folder,AttributeType=S AttributeName=FormId,AttributeType=S \
    --global-secondary-index-updates \
    "[{\"Create\":{\"IndexName\": \"FormFolderIndex\",\"KeySchema\":[{\"AttributeName\":\"Folder\",\"KeyType\":\"HASH\"}, {\"AttributeName\":\"FormId\",\"KeyType\":\"RANGE\"}], \
    \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5      },\"Projection\":{\"ProjectionType\":\"ALL\"}}}]"

aws dynamodb update-table \
    --table-name data \
    --endpoint-url http://localhost:8000 \
    --attribute-definitions AttributeName=email,AttributeType=S AttributeName=userId,AttributeType=S \
    --global-secondary-index-updates \
    "[{\"Create\":{\"IndexName\": \"UserByEmail\",\"KeySchema\":[{\"AttributeName\":\"email\",\"KeyType\":\"HASH\"}, {\"AttributeName\":\"userId\",\"KeyType\":\"RANGE\"}], \
    \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5      },\"Projection\":{\"ProjectionType\":\"ALL\"}}}]"

aws dynamodb update-table \
    --table-name data \
    --endpoint-url http://localhost:8000 \
    --attribute-definitions AttributeName=NewSubmissionKey,AttributeType=S \
    --global-secondary-index-updates \
    "[{\"Create\":{\"IndexName\": \"UnprocessedSubmissionsIndex\",\"KeySchema\":[{\"AttributeName\":\"SubmissionFormId\",\"KeyType\":\"HASH\"}, {\"AttributeName\":\"NewSubmissionKey\",\"KeyType\":\"RANGE\"}], \
    \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5      },\"Projection\":{\"ProjectionType\":\"ALL\"}}}]"

aws dynamodb update-table \
    --table-name data \
    --endpoint-url http://localhost:8000 \
    --attribute-definitions AttributeName=ParentFolder,AttributeType=S \
    --global-secondary-index-updates \
    "[{\"Create\":{\"IndexName\": \"FolderChildrenIndex\",\"KeySchema\":[{\"AttributeName\":\"ParentFolder\",\"KeyType\":\"HASH\"}], \
    \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5      },\"Projection\":{\"ProjectionType\":\"ALL\"}}}]"
