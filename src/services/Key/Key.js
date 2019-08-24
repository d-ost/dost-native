const web3utils = require('web3-utils');
const Scrypt = require('scrypt');

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


    this.encryptionKey = Key.calculateEncryptionKey(this.userSecret, this.salt);
    assert(typeof this.encryptionKey === 'string');
    assert(this.encryptionKey !== '');
  }

  pem() {}

  pemPass() {}

  encrypt(data) {}

  decrypt(encryptedData) {}

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

  static calculateEncryptionKey(userSecret, salt) {
    assert(typeof userSecret === 'string');
    assert(userSecret !== '');

    assert(typeof salt === 'string');
    assert(salt !== '');

    return Scrypt.hash(this.userSecret, { N: 16384, r: 8, p: 1 }, 64, salt).toString();
  }
}

module.exports = Key;
