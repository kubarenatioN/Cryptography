import { Encryption } from './helpers';
export declare class Decoder {
    private keys;
    private reversedSecret;
    private invertedR;
    constructor(keys?: Encryption.IKeys);
    decode(data: number[] | bigint[]): string;
    readonly publicKey: bigint[];
    static from(keys: {
        secretKey: bigint[];
        secretPair: {
            q: bigint;
            r: bigint;
        };
    }): Decoder;
}
