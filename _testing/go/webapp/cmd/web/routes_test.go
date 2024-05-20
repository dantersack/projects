package main

import (
	"net/http"
	"strings"
	"testing"

	"github.com/go-chi/chi/v5"
)

func Test_application_routes(t *testing.T) {
	registered := []struct {
		uri    string
		method string
	}{
		{uri: "/", method: "GET"},
		{uri: "/static/*", method: "GET"},
	}

	app := application{}
	mux := app.routes()

	chiRoutes := mux.(chi.Routes)

	for _, route := range registered {
		if !routeExists(route.uri, route.method, chiRoutes) {
			t.Errorf("Route %s is not registered", route.uri)
		}
	}
}

func routeExists(testRoute, testMethod string, chiRoutes chi.Routes) bool {
	found := false

	_ = chi.Walk(chiRoutes, func(method, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		if strings.EqualFold(route, testRoute) && strings.EqualFold(method, testMethod) {
			found = true
		}
		return nil
	})

	return found
}
