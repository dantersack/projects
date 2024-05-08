# Go test commands

## Run tests

```
go test .
```

```
go test -v .
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
go tool cover -html-coverage.out
```
