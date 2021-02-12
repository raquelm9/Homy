const config = require("../config");
const crypto = require('crypto');

const algorithm = config.GOOGLE.CIPHER_ALGORITHM;
const secretKey = config.GOOGLE.CIPHER_SECRET_KEY;
const iv = crypto.randomBytes(parseInt(config.GOOGLE.CIPHER_IV));
// const iv = crypto.randomBytes(16);

exports.encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

exports.decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypted.toString();
};

