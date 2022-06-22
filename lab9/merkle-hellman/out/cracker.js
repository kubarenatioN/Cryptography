"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const one = BigInt(1);
const two = BigInt(2);
class Cracker {
    crack(publicKey) {
        const start = helpers_1.AdvancedMath.bigint.max(...publicKey) + one;
        const end = (helpers_1.AdvancedMath.bigint.max(...publicKey) + one) * two;
        for (let q = start; q < end; q++) {
            for (let r = one; r < q - one; r++) {
                if (!helpers_1.AdvancedMath.logical.coprime(r, q)) {
                    continue;
                }
                // @ts-ignore
                const secretKey = publicKey.map((key) => (BigInt(key) * r) % q);
                if (helpers_1.AdvancedMath.logical.isSuperSequence(secretKey)) {
                    // @ts-ignore
                    const sum = secretKey.reduce((accumulator, current) => accumulator + current);
                    if (q > sum) {
                        return {
                            secretKey,
                            secretPair: {
                                q,
                                r: helpers_1.AdvancedMath.arithmetic.multiplicativeInverse(r, q),
                            },
                        };
                    }
                }
            }
        }
        throw Error('Cannot find secret key');
    }
}
exports.Cracker = Cracker;
//# sourceMappingURL=cracker.js.map