package main

import (
	"fmt"
)

func main() {
	fmt.Println(twoSum([]int{7, 2, 11, 15, 4, 6, 1}, 9))
}

func twoSum(nums []int, target int) []int {
	for i, vi := range nums {
		for j, vj := range nums {
			if i != j && vi+vj == target {
				return []int{i, j}
			}
		}
	}

	return []int{}
}
