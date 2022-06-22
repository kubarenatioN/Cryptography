import * as logic from './logical';
import * as arithmeticMath from './arithmetic';
import * as bigIntMath from './bigInt';
export declare namespace AdvancedMath {
    const logical: typeof logic;
    const crypto: {
        randomRange: (min: bigint, max: bigint) => bigint;
    };
    const bigint: typeof bigIntMath;
    const arithmetic: typeof arithmeticMath;
}
