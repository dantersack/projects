# Quickstart commands

## Docker commands

```
docker run -e POSTGRES_PASSWORD=postgres --name=pg --rm -d -p 5432:5432 postgres:14
```

```
docker exec -u postgres -it pg psql
```

## Setup new ts project

```
npm init -y
```

```
npm i --save-dev typescript ts-node @types/node
```

```
npx tsc --init
```

## Setup jest with ts

```
npm i --save-dev jest @types/jest @babel/core @babel/preset-env @babel/preset-typescript babel-jest
```

### Create `babel.config.js` file

```
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
```
