package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func getProductsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")
	jsonData, err := json.Marshal(products)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		errResp := ErrorResponse{
			ErrorMessage: "An error occured",
			Status:       http.StatusInternalServerError,
		}
		jsonErrResp, _ := json.Marshal(errResp)
		fmt.Fprint(w, string(jsonErrResp))
		return
	}
	fmt.Fprintf(w, "Products: %v", string(jsonData))
}

func getProductByIdHandler(w http.ResponseWriter, r *http.Request) {
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
}
