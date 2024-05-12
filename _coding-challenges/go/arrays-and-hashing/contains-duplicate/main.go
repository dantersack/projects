package main

import (
	"fmt"
)

func main() {
	fmt.Println(containsDuplicate([]int{1, 2, 3, 1}))
}

func containsDuplicate(nums []int) bool {
	set := make(map[int]int)

	for _, v := range nums {
		set[v]++
		if set[v] > 1 {
			return true
		}
	}

	return false
}
