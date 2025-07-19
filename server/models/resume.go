// File: server/models/resume.go
package models

import "gorm.io/gorm"

type Resume struct {
	gorm.Model
	Title   string `json:"title"`
	Content string `gorm:"type:text" json:"content"`
	UserID  uint   `json:"user_id"`
}
