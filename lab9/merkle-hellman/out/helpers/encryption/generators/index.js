"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config");
const advancedMath_1 = require("../../advancedMath");
const zero = BigInt(0);
const one = BigInt(1);
const two = BigInt(2);
exports.generateSecret = (length) => {
    length = length || config_1.Config.keyLength;
    let sum = zero;
    return Array(length).fill(zero).map(() => {
        const current = advancedMath_1.AdvancedMath.crypto.randomRange(sum + one, (sum + one) * two);
        sum += current;
        return current;
    });
};
exports.generateSecretPair = (secretKey) => {
    const sum = secretKey.reduce((accumulator, current) => accumulator + current);
    const genNewQ = () => advancedMath_1.AdvancedMath.crypto.randomRange(sum + one, (sum + one) * two);
    const genNewR = () => advancedMath_1.AdvancedMath.crypto.randomRange(one, q - one);
    let q = genNewQ();
    let r = genNewR();
    while (!advancedMath_1.AdvancedMath.logical.coprime(r, q)) {
        q = genNewQ();
        r = genNewR();
    }
    return { q, r };
};
exports.generatePublic = (secretKey, secretPair) => {
    return secretKey.map(value => (value * secretPair.r) % secretPair.q);
};
//# sourceMappingURL=index.js.map