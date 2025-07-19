package models

import "gorm.io/gorm"

type User struct {
	gorm.Model // Adds ID, CreatedAt, etc.
	FirstName  string
	LastName   string
	Email      string `gorm:"unique;not null"`
	Password   string `gorm:"not null"`
}