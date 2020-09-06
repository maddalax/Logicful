package models

import "github.com/dgrijalva/jwt-go"

type User struct {
	Id        string `json:"id" dynamodbav:"userId"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Password  string `json:"password,omitempty"`
	TeamId    string `json:"teamId"`
	Creatable
	Changeable
}

type UserLoginClaims struct {
	Id        string `json:"id"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	TeamId    string `json:"teamId"`
	Creatable
	jwt.StandardClaims
}
