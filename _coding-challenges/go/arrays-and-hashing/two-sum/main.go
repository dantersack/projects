package main

import "fmt"

func main() {
	fmt.Println(twoSum([]int{7, 2, 11, 15, 4, 6, 1}, 9))
}

func twoSum(nums []int, target int) []int {
	var idx1 int
	var idx2 int

	for i, vi := range nums {
		for j, vj := range nums {
			if i != j && vi+vj == target {
				idx1 = i
				idx2 = j
				break
			}
		}

	}

	return []int{idx1, idx2}
}
