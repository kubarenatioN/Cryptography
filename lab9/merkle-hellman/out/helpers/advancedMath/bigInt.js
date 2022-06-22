"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zero = BigInt(0);
exports.max = (...values) => {
    if (values.length === 0) {
        return undefined;
    }
    // @ts-ignore
    return values.reduce((accumulator, current) => accumulator < current ? BigInt(current) : accumulator);
};
//# sourceMappingURL=bigInt.js.map