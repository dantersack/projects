package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Shop REST API using Go 1.22")

	mux := http.NewServeMux()

	mux.HandleFunc("GET /products", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "return all products\n")
	})

	mux.HandleFunc("GET /products/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		fmt.Fprintf(w, "return product with id: %s\n", id)
	})

	mux.HandleFunc("POST /products", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "create a new product\n")
	})

	if err := http.ListenAndServe("localhost:8080", mux); err != nil {
		fmt.Println(err.Error())
	}
}
