const { assert } = require('chai');
const crypto = require('crypto');

const Key = require('../../../src/services/Key/Key');

function getRandomIntInclusive(_min, _max) {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);

  // The maximum is inclusive and the minimum is inclusive.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('Key::encryption', async () => {
  it('happy paths', async () => {
    const userAddress = 'userAddress';
    const pin = '123456';

    const key = new Key(userAddress, pin);

    const data = 'something to encrypt';

    const encryptedData = key.encrypt(data);
    const decryptedData = key.decrypt(encryptedData);

    assert.strictEqual(
      data,
      decryptedData,
    );
  });

  it('fuzzy test', async () => {
    for (let i = 0; i < 20; i += 1) {
      const userAddress = crypto.randomBytes(getRandomIntInclusive(5, 20)).toString();
      const pin = crypto.randomBytes(6).toString();

      const key = new Key(userAddress, pin);

      const data = crypto.randomBytes(getRandomIntInclusive(5, 200)).toString();

      const encryptedData = key.encrypt(data);
      const decryptedData = key.decrypt(encryptedData);

      assert.strictEqual(
        data,
        decryptedData,
      );
    }
  });
});
