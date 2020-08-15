package models

type OptionSet struct {
	Id    string
	Type  string
	Name  string
	Value string
	Changeable
	Creatable
}
