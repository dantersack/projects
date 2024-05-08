package main

import "testing"

func Test_isPrime(t *testing.T) {
	primeTests := []struct {
		testName       string
		testNum        int
		expectedResult bool
		expectedMsg    string
	}{
		{"prime", 7, true, "7 is prime"},
		{"not prime", 8, false, "8 is not prime because it is divisible by 2"},
		{"0 is not prime", 0, false, "0 is not prime, by definition"},
		{"1 is not prime", 1, false, "1 is not prime, by definition"},
		{"negative numbers are not prime", -1, false, "Negative numbers are not prime, by definition"},
	}

	for _, entry := range primeTests {
		result, msg := isPrime(entry.testNum)

		if !entry.expectedResult && result {
			t.Errorf("%s: expected false, but got true", entry.testName)
		}

		if entry.expectedResult && !result {
			t.Errorf("%s: expected true, but got false", entry.testName)
		}

		if entry.expectedMsg != msg {
			t.Errorf("%s: Expected '%s' but got '%s'", entry.testName, entry.expectedMsg, msg)
		}
	}
}
