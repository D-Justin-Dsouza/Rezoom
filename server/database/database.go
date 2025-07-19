// File: server/database/database.go
package database

import (
	"log"
	"rezoom/server/models" 
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)
var DB *gorm.DB
func Connect() {
	var err error
	DB, err = gorm.Open(sqlite.Open("rezoom.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}
	log.Println("Database connection established.")
	// This line reads our User model and automatically creates the 'users' table in the database with the correct columns.
	DB.AutoMigrate(&models.User{})
	log.Println("Database migrated.")
}
