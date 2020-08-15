package models

type Changeable struct {
	ChangeTime string
	ChangeBy   string
}

type Creatable struct {
	CreateTime string
	CreateBy   string
}
