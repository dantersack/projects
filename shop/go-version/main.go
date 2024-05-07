package main

import (
	"fmt"
	"net/http"
)

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

	mux.HandleFunc("GET /products", getProductsHandler)
	mux.HandleFunc("GET /products/{id}", getProductByIdHandler)

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
