package models

type OptionSet struct {
	Id    string `json:"id"`
	Type  string `json:"type"`
	Name  string `json:"name"`
	Value string `json:"value"`
	Changeable
	Creatable
}
