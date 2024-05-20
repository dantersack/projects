# Go test commands

## Run tests

```
go test .
```

```
go test -v .
```

```
go test -run Test_{pattern}
```

```
go test -v -run Test_{pattern}
```

## Run all tests in the current folder and subsequents subfolders

```
go test ./...
```

## Test coverage

### See test coverage %

```
go test -cover .
```

### Create `coverage.out` file to see covered code lines in a browser

```
go test -coverprofile=coverage.out
```

```
go tool cover -html=coverage.out
```
