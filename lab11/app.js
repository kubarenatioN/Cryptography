const sha = require('./src/main.js')

const c = sha('hello world')
const c2 = sha('Hello world')

console.log('hash:  ', c);
console.log('hash 2:', c2);