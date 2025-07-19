package main

import (
	"log"
	"rezoom/server/controllers" 
	"rezoom/server/database"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()

	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	router.Use(cors.New(config))

	api := router.Group("/api")
	{
		// Public routes
		api.POST("/register", controllers.Register)
		api.POST("/login", controllers.Login)

		// Protected routes
		protected := api.Group("/")
		protected.Use(controllers.AuthMiddleware())
		{
			protected.POST("/resumes", controllers.CreateResume)
			protected.GET("/resumes", controllers.GetResumes)
		}
	}

	log.Println("Starting Go API server on http://localhost:8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
