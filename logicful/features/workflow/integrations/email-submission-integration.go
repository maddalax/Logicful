package integrations

import (
	"encoding/json"
	"github.com/antonholmquist/jason"
	"github.com/logicful/models"
	"github.com/logicful/service/emailer"
	"github.com/logicful/service/queue"
	"strings"
)

func RegisterEmail() {
	queue.Receive("send-submission-email", func(message []byte) error {
		var result models.Integration
		err := json.Unmarshal(message, &result)
		if err != nil {
			return err
		}
		return sendSubmissionEmail(result)
	})
}

func sendSubmissionEmail(integration models.Integration) error {
	println("Sending email: " + integration.Submission.Id + " " + integration.Config["to"])
	body, err := formatEmail(integration)
	if err != nil {
		return err
	}
	println(body)
	err = emailer.Send(emailer.Email{
		To:       integration.Config["to"],
		From:     "maddox@logicful.org",
		Template: "new-submission",
		Model: map[string]string{
			"body":               body,
			"formName":           integration.Form.Title,
			"unsubscribeUrl":     "http://localhost:5000/unsubscribe",
			"viewSubmissionsUrl": "http://localhost:5000/form/submissions?formId=" + integration.Submission.FormId,
			"viewSubmissionUrl":  "http://localhost:5000/form/submissions?formId=" + integration.Submission.FormId + "&submissionId=" + integration.Submission.Id,
		},
	})
	if err != nil {
		return err
	}
	return nil
}

func formatEmail(integration models.Integration) (string, error) {
	var result map[string]interface{}
	var serialized, err = json.Marshal(integration.Submission.Details)
	if err != nil {
		return "", err
	}
	err = json.Unmarshal(serialized, &result)
	if err != nil {
		return "", err
	}

	fields := make([]models.FormField, 0)
	for _, field := range integration.Form.Fields {
		var f models.FormField
		bytes, _ := json.Marshal(field)
		json.Unmarshal(bytes, &f)
		fields = append(fields, f)
	}

	var builder strings.Builder
	for key, _ := range result {
		for _, field := range fields {
			if field.Name == key || field.Label == key {
				value := formatField(field, result[key])
				if value != "" {
					builder.WriteString("<h4><strong>" + field.Label + "</strong></h4>")
					builder.WriteString(value)
					builder.WriteString("<br>")
				}
			}
		}
	}
	var b = builder.String()
	return b, nil
}

func formatField(field models.FormField, data interface{}) string {
	if w, ok := data.(string); ok {
		return "<p>" + w + "</p>"
	}
	serialized, err := json.Marshal(data)
	if err != nil {
		return ""
	}
	v, err := jason.NewObjectFromBytes(serialized)
	if err != nil {
		return ""
	}
	var builder strings.Builder
	if field.Type == "address" {
		writeField(&builder, v, "Address", "address1", "value")
		writeField(&builder, v, "Address 2", "address2", "value")
		writeField(&builder, v, "City", "city", "value")
		writeField(&builder, v, "State", "state", "value")
		writeField(&builder, v, "Zip Code", "zip", "value")
	}
	if field.Type == "full-name" {
		writeField(&builder, v, "Prefix", "prefix", "value")
		writeField(&builder, v, "First", "first", "value")
		writeField(&builder, v, "Middle", "middle", "value")
		writeField(&builder, v, "Last", "last", "value")
		writeField(&builder, v, "Suffix", "suffix", "value")
	}
	return builder.String()
}

func writeField(builder *strings.Builder, v *jason.Object, name string, path ...string) {
	val, err := v.GetString(path...)
	if err == nil {
		builder.WriteString("<p><strong>" + name + ": " + "</strong>")
		builder.WriteString(val)
		builder.WriteString("</p>")
	}
}
