"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
exports.coprime = (a, b) => {
    return _1.AdvancedMath.arithmetic.gcd(a, b) === BigInt(1);
};
exports.isSuperSequence = (sequence) => {
    let sum = BigInt(0);
    for (const element of sequence) {
        if (element <= sum) {
            return false;
        }
        sum += element;
    }
    return true;
};
//# sourceMappingURL=logical.js.map