const assert = require('assert');
const crypto = require('crypto');
const Scrypt = require('scrypt');
const web3utils = require('web3-utils');

class Key {
  constructor(userAddress, pin) {
    assert(typeof userAddress === 'string');
    assert(userAddress !== '');

    this.userAddress = userAddress;

    assert(typeof pin === 'string');
    assert(pin !== '');

    this.pin = pin;

    this.userSecret = Key.calculateUserSecret(this.userAddress, this.pin);
    assert(typeof this.userSecret === 'string');
    assert(this.userSecret !== '');

    this.salt = Key.generateSalt();
    assert(typeof this.salt === 'string');
    assert(this.salt !== '');

    this.encryptionKeySeed = Key.calculateEncryptionKeySeed(this.userSecret, this.salt);
    assert(typeof this.encryptionKeySeed === 'string');
    assert(this.encryptionKeySeed !== '');

    const keys = crypto.generateKeyPairSync(
      'rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          cipher: 'aes-256-cbc',
          format: 'pem',
          passphrase: this.pin,
        },
      },
    );

    assert(typeof keys.publicKey === 'string');
    assert(keys.publicKey !== '');
    this.publicKey = keys.publicKey;

    assert(typeof keys.privateKey === 'string');
    assert(keys.privateKey !== '');
    this.privateKey = keys.privateKey;
  }

  pem() {
    assert(typeof this.privateKey === 'string');
    assert(this.privateKey !== '');

    return this.privateKey;
  }

  pemPass() {
    assert(typeof this.pin === 'string');
    assert(this.pin !== '');

    return this.pin;
  }

  encrypt(data) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.privateKey);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  }

  decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.privateKey);
    let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  static calculateUserSecret(userAddress, pin) {
    assert(typeof userAddress === 'string');
    assert(userAddress !== '');

    assert(typeof pin === 'string');
    assert(pin !== '');

    return web3utils.sha3(
      JSON.stringify({
        userAddress,
        pin,
      }),
    );
  }

  static generateSalt() {
    return web3utils.randomHex(32);
  }

  static calculateEncryptionKeySeed(userSecret, salt) {
    assert(typeof userSecret === 'string');
    assert(userSecret !== '');

    assert(typeof salt === 'string');
    assert(salt !== '');

    return Scrypt.hashSync(userSecret, { N: 16384, r: 8, p: 1 }, 64, salt).toString();
  }
}

module.exports = Key;
