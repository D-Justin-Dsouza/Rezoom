// File: server/controllers/resume_controller.go
package controllers

import (
	"net/http"
	"rezoom/server/database"
	"rezoom/server/models"

	"github.com/gin-gonic/gin"
)

// CreateResume handles saving a new resume to the database.
func CreateResume(c *gin.Context) {
	var input struct {
		Title   string `json:"title" binding:"required"`
		Content string `json:"content"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is a required field."})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not get user from token"})
		return
	}

	resume := models.Resume{
		Title:   input.Title,
		Content: input.Content,
		UserID:  userID.(uint),
	}

	// We use a transaction for a safer save operation.
	tx := database.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start database transaction."})
		return
	}

	result := tx.Create(&resume)

	// THE FIX: We now check both the error AND the number of rows affected.
	if result.Error != nil || result.RowsAffected == 0 {
		tx.Rollback() // Undo the transaction if something went wrong
		
		// Create a more descriptive error
		errMessage := "Failed to save resume to the database."
		if result.Error != nil {
			errMessage = result.Error.Error()
		} else if result.RowsAffected == 0 {
			errMessage = "Database record was not created, no rows affected."
		}

		c.JSON(http.StatusInternalServerError, gin.H{"error": errMessage})
		return
	}

	// If everything is successful, commit the transaction.
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Resume created successfully", "resume": resume})
}

// GetResumes fetches all resumes for the logged-in user.
func GetResumes(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not get user from token"})
		return
	}

	var resumes []models.Resume
	database.DB.Where("user_id = ?", userID).Find(&resumes)

	c.JSON(http.StatusOK, gin.H{"resumes": resumes})
}
