import { ISecretPair } from './iSecretPair';
export declare const generateSecret: (length?: number | undefined) => bigint[];
export declare const generateSecretPair: (secretKey: bigint[]) => ISecretPair;
export declare const generatePublic: (secretKey: bigint[], secretPair: ISecretPair) => bigint[];
export * from './iSecretPair';
