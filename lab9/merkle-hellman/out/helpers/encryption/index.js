"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generators_1 = require("./generators");
var Encryption;
(function (Encryption) {
    function getKeys(length) {
        const secretKey = generators_1.generateSecret(length);
        const secretPair = generators_1.generateSecretPair(secretKey);
        const publicKey = generators_1.generatePublic(secretKey, secretPair);
        return {
            secretKey,
            secretPair,
            publicKey,
        };
    }
    Encryption.getKeys = getKeys;
    Encryption.generatePublicKey = generators_1.generatePublic;
})(Encryption = exports.Encryption || (exports.Encryption = {}));
//# sourceMappingURL=index.js.map