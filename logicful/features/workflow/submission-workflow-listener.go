package workflow

import (
	"api/features/form"
	"api/features/workflow/integrations"
	"encoding/json"
	"github.com/logicful/models"
	"github.com/logicful/service/queue"
)

func Register() {
	registerWorkflowProcessor()
	integrations.RegisterEmail()
}

func registerWorkflowProcessor() {
	queue.Receive("workflow", func(message []byte) error {
		var result models.Submission
		err := json.Unmarshal(message, &result)
		if err != nil {
			return err
		}
		return processWorkflow(result)
	})
}

func processWorkflow(submission models.Submission) error {
	f, err := form.GetWorkflow(submission.FormId)
	if err != nil {
		return err
	}
	for _, integration := range f.Workflow.Integrations {
		err := queue.Dispatch(integration.Name, models.Integration{
			Submission: submission,
			Name:       integration.Name,
			Config:     integration.Config,
		})
		if err != nil {
			return err
		}
	}
	return nil
}
