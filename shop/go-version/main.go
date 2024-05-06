package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type Product struct {
	Id          int     `json:"id"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
}

var id int = 0

var products = []Product{}

func seedProducts(products *[]Product) {
	for i := 0; i < 3; i++ {
		id++
		*products = append(*products, Product{Id: id, Description: fmt.Sprintf("Test_%d", id), Price: 99.99})
	}
}

func findProduct(id int, products []Product) (Product, error) {
	for _, val := range products {
		if val.Id == id {
			return val, nil
		}
	}
	return Product{}, fmt.Errorf("Product with id=%d not found", id)
}

func main() {
	fmt.Println("Shop REST API using Go 1.22")

	seedProducts(&products)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /products", func(w http.ResponseWriter, r *http.Request) {
		jsonData, err := json.Marshal(products)
		if err != nil {
			fmt.Fprintf(w, "An error occurred")
			return
		}
		fmt.Fprintf(w, "Products: %v", string(jsonData))
	})

	mux.HandleFunc("GET /products/{id}", func(w http.ResponseWriter, r *http.Request) {
		numericId, castError := strconv.Atoi(r.PathValue("id"))
		if castError != nil {
			panic(castError)
		}
		searchedProduct, errorWhileSearching := findProduct(numericId, products)
		if errorWhileSearching != nil {
			fmt.Fprintf(w, "Error! Product not found!")
			return
		}
		jsonData, jsonError := json.Marshal(searchedProduct)
		if jsonError != nil {
			fmt.Fprintf(w, "An error occurred")
			return
		}
		fmt.Fprintf(w, "Product found: %v", string(jsonData))
	})

	mux.HandleFunc("POST /products", func(w http.ResponseWriter, r *http.Request) {
		p := Product{
			Id:          id + 1,
			Description: "New product",
			Price:       1200,
		}
		products = append(products, p)
		fmt.Fprintf(w, "Product created: %v", p)
	})

	if err := http.ListenAndServe("localhost:8080", mux); err != nil {
		fmt.Println(err.Error())
	}
}
