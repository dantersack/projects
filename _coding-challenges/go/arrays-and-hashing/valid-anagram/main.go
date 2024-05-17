package main

import (
	"fmt"
	"maps"
)

func main() {
	fmt.Println(isAnagram("anagram", "nagaram"))
}

func isAnagram(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}

	set1 := make(map[byte]int)
	set2 := make(map[byte]int)

	for idx := range s {
		c1 := s[idx]
		c2 := t[idx]

		set1[c1]++
		set2[c2]++
	}

	return maps.Equal(set1, set2)
}
