package main

import (
	"fmt"
	"slices"
	"testing"
)

func Test_twoSum(t *testing.T) {
	testCases := []struct {
		nums      []int
		target    int
		expected1 []int
		expected2 []int
	}{
		{nums: []int{2, 7, 11, 15}, target: 9, expected1: []int{0, 1}, expected2: []int{1, 0}},
		{nums: []int{3, 2, 4}, target: 6, expected1: []int{1, 2}, expected2: []int{2, 1}},
		{nums: []int{3, 3}, target: 6, expected1: []int{0, 1}, expected2: []int{1, 0}},
	}

	for i, e := range testCases {
		t.Run(fmt.Sprintf("Test case #%d", i), func(t *testing.T) {
			output := twoSum(e.nums, e.target)
			if !slices.Equal(output, e.expected1) && !slices.Equal(output, e.expected2) {
				t.Errorf("Expected %v or %v but got %v", e.expected1, e.expected2, output)
			}
		})
	}
}
