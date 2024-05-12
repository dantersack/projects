package main

import (
	"fmt"
	"testing"
)

func Test_containsDuplicate(t *testing.T) {
	testCases := []struct {
		nums     []int
		expected bool
	}{
		{nums: []int{1, 2, 3, 1}, expected: true},
		{nums: []int{1, 2, 3, 4}, expected: false},
		{nums: []int{1, 1, 1, 3, 3, 4, 3, 2, 4, 2}, expected: true},
	}

	for i, e := range testCases {
		t.Run(fmt.Sprintf("Test case #%d", i), func(t *testing.T) {
			output := containsDuplicate(e.nums)
			if output != e.expected {
				t.Errorf("Expected %t but got %t", e.expected, output)
			}
		})
	}
}
