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
	Id   string `json:"id"`
	Name string `json:"name"`
	Changeable
	Creatable
	Fields []Field `json:"fields"`
}

type Field struct {
	Name    string      `json:"name"`
	Label   string      `json:"label"`
	Type    string      `json:"type"`
	Id      string      `json:"id"`
	Options interface{} `json:"options"`
	Value   interface{} `json:"value"`
}