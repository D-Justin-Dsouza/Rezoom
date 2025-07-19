package controllers

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)
var jwtSecret = []byte(os.Getenv("JWT_SECRET"))
func GenerateJWT(userID uint) (string, error) {
	if len(jwtSecret) == 0 {
		jwtSecret = []byte("a_very_secret_and_secure_key_for_dev")
	}

	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(), 
		"iat":     time.Now().Unix(),                      
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
