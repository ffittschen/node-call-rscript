# node-call-rscript
Call Rscripts from node.js passing JSON both ways.

## Install
```
yarn add https://github.com/ffittschen/node-call-rscript
```

## Usage
```js
const R = require('node-call-rscript');

// Sync
R.callSync('path/to/Rscript.R', [Args]);

// Async using Promises
R.call('path/to/Rscript.R', [Args]);
```

## Synchronous
```js
const result = R.callSync('./test.R', {
  a: 1,
  b: 3,
});
console.log(result);
```

## Asynchronous
```js
R.call('./test.R', {
  a: 1,
  b: 3,
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log('error = ', error);
});
```

## R script template
The `node-call-rscript` module tries to parse the whole stdout body from the R script as JSON.
Therefore it is suggested to follow the [Template](./R/template.R), capture all stdout from the script
and only print the JSON that should be returned to the JavaScript code.

## Example
```
yarn test
```
