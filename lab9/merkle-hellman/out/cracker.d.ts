export interface ICrackResult {
    secretKey: bigint[];
    secretPair: {
        q: bigint;
        r: bigint;
    };
}
export declare class Cracker {
    crack(publicKey: number[] | bigint[]): ICrackResult;
}
