package models

type OptionSet struct {
	Id    string `json:"id"`
	Type  string `json:"type"`
	Name  string `json:"name"`
	Value string `json:"value"`
	Changeable
	Creatable
}

type Form struct {
	Id    string `json:"id"`
	Title string `json:"title"`
	Changeable
	Creatable
	Fields          []Field          `json:"fields"`
	Submissions     []LeanSubmission `json:"submissions,omitempty"`
	SubmissionCount int64            `json:"submissionCount"`
	Versioned
	Folder   string `json:"folder"`
	ClientId string `json:"clientId"`
	FormId   string `json:"formId,omit"`
}

type Folder struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Changeable
	Creatable
	Parent string `json:"parent"`
	Versioned
	ClientId string `json:"clientId"`
	FolderId string `json:"folderId"`
}

type LeanForm struct {
	Id string
	Changeable
	Title string
}

type LeanSubmission struct {
	Id string
	Creatable
	Status string
}

type Submission struct {
	FormId    string      `json:"formId"`
	Id        string      `json:"id"`
	Details   interface{} `json:"details"`
	Meta      interface{} `json:"meta"`
	FieldMeta interface{} `json:"fieldMeta"`
	Status    string      `json:"status"`
	Creatable
}

type SubmissionsDeleted struct {
	FormId string   `json:"formId"`
	Ids    []string `json:"ids"`
}

type Field struct {
	Name    string      `json:"name"`
	Label   string      `json:"label"`
	Type    string      `json:"type"`
	Id      string      `json:"id"`
	Options interface{} `json:"options,omitempty"`
	Value   interface{} `json:"value,omitempty"`
}

type ContentBlock struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Changeable
	Creatable
	Value string `json:"value"`
}
