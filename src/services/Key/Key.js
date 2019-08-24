const web3utils = require('web3-utils');
const Scrypt = require('scrypt');
const crypto = require('crypto');

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
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          cipher: 'aes-256-cbc',
          passphrase: this.pin,
        },
      },
    );
    this.publicKey = keys.publicKey;
    this.privateKey = keys.privateKey;
  }

  pem() {
    return this.privateKey.export({
      format: 'pem',
    });
  }

  pemPass() {
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

    assert(typeof pin === 'string')
      .assert(pin !== '');

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

    return Scrypt.hash(this.userSecret, { N: 16384, r: 8, p: 1 }, 64, salt).toString();
  }
}

module.exports = Key;
