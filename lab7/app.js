var CryptoJS = require("crypto-js")

const key = 'qweasdzx'
const message = 'kubarenatioN'
const enc = CryptoJS.DES.encrypt(message, key).toString()

console.log(enc);

const dec = CryptoJS.DES.decrypt(enc, key);
const text = dec.toString(CryptoJS.enc.Utf8);

console.log(text);