package main

import (
	"log"
	"net/http"
)

type application struct{}

func main() {
	// Setup an app config
	app := application{}

	// Get application routes
	mux := app.routes()

	// Print out a message
	log.Println("Starting server on port 8080...")

	// Start the server
	err := http.ListenAndServe("localhost:8080", mux)
	if err != nil {
		log.Fatal(err)
	}
}
