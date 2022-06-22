export declare class Encoder {
    private readonly publicKey;
    constructor(publicKey: bigint[]);
    encode(data: string): bigint[];
}
