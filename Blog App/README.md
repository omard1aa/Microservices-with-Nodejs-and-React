
# Typescript support for NodeJS project

```sh
npm init -y
```
```sh
npm install typescript --save-dev
```
```sh
npx tsc --init
```

```sh
install ts-node --save-dev
```
```sh
install @types/express --save-dev
```

# Linting
```sh
npm install eslint --save-dev
```

```sh
npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

### Once both packages are installed, open up your .eslintrc.js file in your editor, and enter the following:

```js
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest", // Allows the use of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  extends: ["plugin:@typescript-eslint/recommended"], // Uses the linting rules from @typescript-eslint/eslint-plugin
  env: {
    node: true, // Enable Node.js global variables
  },
};
```

### If you want to override any of the linting rules or configure other rules, use the rules property in the .eslintrc.js file:

```js
module.exports = {
  . . .
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
```

```sh
npx eslint . --fix
```

## To be able to run your lint script add this script to your package.json file
```json
{
  "scripts": {
    . . .
    "lint": "eslint . --fix"
  }
}
```

```sh
npm run lint
```

> To prevent ESLint from linting certain files or directories, create a .eslintignore file in your project root, and place the patterns for files to ignore therein. Here's an example in which all generated files in the dist folder are ignored:
