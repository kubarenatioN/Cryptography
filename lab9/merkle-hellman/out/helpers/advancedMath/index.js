"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logic = require("./logical");
const arithmeticMath = require("./arithmetic");
const bigIntMath = require("./bigInt");
const cryptoRandom_1 = require("./cryptoRandom");
var AdvancedMath;
(function (AdvancedMath) {
    AdvancedMath.logical = logic;
    AdvancedMath.crypto = {
        randomRange: cryptoRandom_1.randomRange,
    };
    AdvancedMath.bigint = bigIntMath;
    AdvancedMath.arithmetic = arithmeticMath;
})(AdvancedMath = exports.AdvancedMath || (exports.AdvancedMath = {}));
//# sourceMappingURL=index.js.map