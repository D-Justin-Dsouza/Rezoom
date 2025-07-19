// File: server/controllers/jwt.go
// This is the complete and corrected file.
package controllers

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

// GenerateJWT creates a new JWT for a given user ID.
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

// ValidateJWT is the new, crucial function.
// It parses a token string and checks if it's valid.
func ValidateJWT(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		
		if len(jwtSecret) == 0 {
			jwtSecret = []byte("a_very_secret_and_secure_key_for_dev")
		}

		return jwtSecret, nil
	})
}
