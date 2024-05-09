package main

import (
	"io"
	"os"
	"strings"
	"testing"
)

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

func Test_prompt(t *testing.T) {
	// Save a copy of os.Stdout
	prevOutput := os.Stdout

	// Create a read and write pipe
	r, w, _ := os.Pipe()

	// Set os.Stdout to our write pipe
	os.Stdout = w

	prompt()

	// Close our writer
	_ = w.Close()

	// Reset os.Stdout to what it was before
	os.Stdout = prevOutput

	// Read the output of our prompt() func from our read pipe
	out, _ := io.ReadAll(r)

	if string(out) != "-> " {
		t.Errorf("Expected '-> ' but got \n'''\n%s\n'''", string(out))
	}
}

func Test_intro(t *testing.T) {
	prevOutput := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	intro()
	_ = w.Close()
	os.Stdout = prevOutput
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "Enter a number") {
		t.Errorf("Incorrect intro text; got: \n'''\n%s\n'''", string(out))
	}
}
