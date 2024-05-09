package main

import (
	"bufio"
	"bytes"
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

func Test_checkNumbers(t *testing.T) {
	tests := []struct {
		testName        string
		testInput       string
		expectedMessage string
	}{
		{testName: "test empty input", testInput: "", expectedMessage: "Please enter a valid number!"},
		{testName: "test zero", testInput: "0", expectedMessage: "0 is not prime, by definition"},
		{testName: "test one", testInput: "1", expectedMessage: "1 is not prime, by definition"},
		{testName: "test two", testInput: "2", expectedMessage: "2 is prime"},
		{testName: "test three", testInput: "3", expectedMessage: "3 is prime"},
		{testName: "test negative number", testInput: "-1", expectedMessage: "Negative numbers are not prime, by definition"},
		{testName: "test typed numbers", testInput: "three", expectedMessage: "Please enter a valid number!"},
		{testName: "test decimal numbers", testInput: "1.1", expectedMessage: "Please enter a valid number!"},
		{testName: "test q", testInput: "q", expectedMessage: ""},
		{testName: "test Q", testInput: "Q", expectedMessage: ""},
	}

	for _, e := range tests {
		input := strings.NewReader(e.testInput)
		reader := bufio.NewScanner(input)
		msg, _ := checkNumbers(reader)

		if !strings.EqualFold(e.expectedMessage, msg) {
			t.Errorf("%s failed: Expected %s but got %s", e.testName, e.expectedMessage, msg)
		}
	}
}

// This test make sure that:
//  1. The goroutine fires
//  2. Take some values
//  3. Does something with them
//  4. Quits when it's told to
func Test_readUserInput(t *testing.T) {
	// To test this function we need a channel
	doneChan := make(chan bool)

	// And an instance of io.Reader
	// For that, create a reference to a bytes.Buffer
	var stdin bytes.Buffer

	stdin.Write([]byte("1\nq\n"))

	go readUserInput(&stdin, doneChan)
	<-doneChan // wait for doneChat to finish
	close(doneChan)
}
