package models

type User struct {
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Password  string `json:"password"`
	TeamId    string `json:"teamId"`
	Creatable
	Changeable
}
