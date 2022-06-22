"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const config_1 = require("../../config");
exports.randomRange = (min, max) => {
    if (min > max) {
        throw Error('The minimum value is greater than the maximum');
    }
    const randomBuffer = crypto.randomBytes(config_1.Config.cryptoRandom.bytesLength);
    const randomNumber = BigInt('0x' + randomBuffer.toString('hex'));
    const maxRandomNumber = BigInt(2) ** (BigInt(8) * BigInt(config_1.Config.cryptoRandom.bytesLength));
    return (randomNumber * BigInt(max - min) / maxRandomNumber) + min;
};
//# sourceMappingURL=cryptoRandom.js.map