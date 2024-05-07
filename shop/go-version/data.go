package main

type Product struct {
	Id          int     `json:"id"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
}

type ErrorResponse struct {
	ErrorMessage string `json:"msg"`
	Status       int    `json:"status"`
}

var id int = 0

var products = []Product{}
