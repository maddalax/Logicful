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
	Fields          []interface{}    `json:"fields"`
	Submissions     []LeanSubmission `json:"submissions,omitempty"`
	SubmissionCount int64            `json:"submissionCount"`
	Versioned
	Folder string `json:"folder"`
	TeamId string `json:"teamId"`
	FormId string `json:"formId,omitempty"`
}

type Folder struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Changeable
	Creatable
	Parent string `json:"parent"`
	Versioned
	TeamId   string `json:"teamId"`
	FolderId string `json:"folderId,omitempty"`
}

type LeanForm struct {
	Id string
	Changeable
	Title string
}

type File struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	FileType string `json:"type"`
	Size     int64  `json:"size"`
}

type LeanSubmission struct {
	Id string
	Creatable
	Status string
}

type SubmissionMeta struct {
	Env       interface{} `json:"env"`
	IpAddress string      `json:"ipAddress"`
}

type Submission struct {
	FormId    string         `json:"formId"`
	Id        string         `json:"id"`
	Details   interface{}    `json:"details"`
	Meta      SubmissionMeta `json:"meta"`
	FieldMeta interface{}    `json:"fieldMeta"`
	Status    string         `json:"status"`
	Processed bool           `json:"processed"`
	Creatable
}

type SubmissionsDeleted struct {
	FormId string   `json:"formId"`
	Ids    []string `json:"ids"`
}

type ContentBlock struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Changeable
	Creatable
	Value string `json:"value"`
}
