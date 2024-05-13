package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	mux := chi.NewRouter()

	// Register middleware
	mux.Use(middleware.Recoverer)

	// Register routes
	mux.Get("/", app.Home)

	// Static assets

	return mux
}
