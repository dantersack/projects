# Quickstart commands

## Setup new ts project

`npm init -y`

`npm i typescript ts-node @types/node --save-dev`

`npx tsc --init`

## Setup jest with ts

`npm i --save-dev jest @types/jest @babel/core @babel/preset-env @babel/preset-typescript babel-jest`

### Create `babel.config.js` file

```
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
```
