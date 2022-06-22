"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
class Decoder {
    constructor(keys) {
        this.keys = keys || helpers_1.Encryption.getKeys();
        this.reversedSecret = [...this.keys.secretKey].reverse();
        this.invertedR = helpers_1.AdvancedMath.arithmetic.multiplicativeInverse(this.keys.secretPair.r, this.keys.secretPair.q);
    }
    decode(data) {
        return data
            //@ts-ignore
            .map((dataElement) => {
            let number = (BigInt(dataElement) * this.invertedR) % this.keys.secretPair.q;
            const binaryRepresentation = [];
            this.reversedSecret.forEach((element, index) => {
                const i = this.keys.secretKey.length - index - 1;
                if (number >= element) {
                    binaryRepresentation[i] = 1;
                    number -= element;
                }
                else {
                    binaryRepresentation[i] = 0;
                }
            });
            return String.fromCharCode(parseInt(binaryRepresentation.join('').padStart(this.publicKey.length, '0'), 2));
        })
            .join('');
    }
    get publicKey() {
        return this.keys.publicKey;
    }
    static from(keys) {
        return new Decoder({
            ...keys,
            publicKey: helpers_1.Encryption.generatePublicKey(keys.secretKey, keys.secretPair),
        });
    }
}
exports.Decoder = Decoder;
//# sourceMappingURL=decoder.js.map