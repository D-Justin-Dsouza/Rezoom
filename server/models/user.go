package models

import "gorm.io/gorm"

// This struct defines the 'users' table in our database.
type User struct {
	gorm.Model
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `gorm:"unique;not null" json:"email"`
	Password  string `gorm:"not null" json:"-"` // json:"-" hides the password
}
