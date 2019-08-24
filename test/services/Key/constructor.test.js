const { assert } = require('chai');

const Key = require('../../../src/services/Key/Key');

describe('Key::constructor', async () => {
  it('checks validity of members after creation', async () => {
    const userAddress = 'userAddress';
    const pin = '123456';

    const key = new Key(userAddress, pin);

    assert.strictEqual(
      key.userAddress,
      userAddress,
    );

    assert.strictEqual(
      key.pin,
      pin,
    );

    assert.isOk(
      key.userSecret,
    );

    assert.isOk(
      key.salt,
    );

    assert.isOk(
      key.encryptionKeySeed,
    );

    assert.isOk(
      key.encryptionKeySeed,
    );

    assert.isOk(
      key.publicKey,
    );

    assert.isOk(
      key.privateKey,
    );
  });

  it('checks similarity and dis-similarity of members in case of the same inputs', async () => {
    const userAddress = 'userAddress';
    const pin = '123456';

    const key1 = new Key(userAddress, pin);
    const key2 = new Key(userAddress, pin);

    assert.strictEqual(
      key1.userSecret,
      key2.userSecret,
    );

    assert.notStrictEqual(
      key1.salt,
      key2.salt,
    );

    assert.notStrictEqual(
      key1.encryptionKeySeed,
      key2.encryptionKeySeed,
    );

    assert.notStrictEqual(
      key1.publicKey,
      key2.publicKey,
    );

    assert.notStrictEqual(
      key1.privateKey,
      key2.privateKey,
    );
  });
});
