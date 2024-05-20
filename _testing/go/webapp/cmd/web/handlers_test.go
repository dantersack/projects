package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func Test_application_handlers(t *testing.T) {
	testCases := []struct {
		name               string
		uri                string
		expectedStatusCode int
	}{
		{name: "Home", uri: "/", expectedStatusCode: http.StatusOK},
		{name: "NotFound", uri: "/some-route-that-not-exists", expectedStatusCode: http.StatusNotFound},
	}

	app := application{}
	routes := app.routes()

	// Create a test server
	ts := httptest.NewTLSServer(routes)
	defer ts.Close()

	pathToTemplates = "../../templates/"

	// Range through to test data
	for _, e := range testCases {
		res, err := ts.Client().Get(ts.URL + e.uri)
		if err != nil {
			t.Log(err)
			t.Fatal(err)
		}

		if res.StatusCode != e.expectedStatusCode {
			t.Errorf("For %s expected status %d , but got %d", e.name, e.expectedStatusCode, res.StatusCode)
		}
	}

}
