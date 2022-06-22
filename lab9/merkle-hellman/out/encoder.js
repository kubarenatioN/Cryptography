"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Encoder {
    constructor(publicKey) {
        this.publicKey = publicKey;
    }
    encode(data) {
        const output = data.split('').map((char => {
            const binaryRepresentation = char
                .normalize()
                .charCodeAt(0)
                .toString(2)
                .padStart(this.publicKey.length, '0');
            return binaryRepresentation
                .split('')
                .reduce((accumulator, bit, index) => accumulator + BigInt(parseInt(bit, 10)) * this.publicKey[index], BigInt(0));
        }));
        return output;
    }
}
exports.Encoder = Encoder;
//# sourceMappingURL=encoder.js.map