import { ISecretPair } from './generators';
export declare namespace Encryption {
    interface IKeys {
        secretKey: bigint[];
        publicKey: bigint[];
        secretPair: ISecretPair;
    }
    function getKeys(length?: number): IKeys;
    const generatePublicKey: (secretKey: bigint[], secretPair: ISecretPair) => bigint[];
}
