package main

import (
	"fmt"
	"testing"
)

func Test_isAnagram(t *testing.T) {
	testCases := []struct {
		s      string
		t      string
		output bool
	}{
		{s: "anagram", t: "nagaram", output: true},
		{s: "rat", t: "cat", output: false},
	}

	for i, e := range testCases {
		t.Run(fmt.Sprintf("Test case #%d", i), func(t *testing.T) {
			output := isAnagram(e.s, e.t)
			if output != e.output {
				t.Errorf("Expected %v but got %v", output, e.output)
			}
		})
	}
}
