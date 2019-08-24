const assert = require('assert');

const Atlas = require('./Atlas');

class AtlasFile {
  constructor(
    ipfsClient,
    key,
    safeAddress,
    recoveryModuleAddress,
    recoveryPrivateKey,
  ) {
    this.ipfsClient = ipfsClient;
    this.key = key;

    this.atlas = new Atlas(
      '',
      0,
      safeAddress,
      recoveryModuleAddress,
      recoveryPrivateKey,
      {},
    );

    this.ipfsPath = '';

    this.keyName = 'atlasEncryptionKey';

    this.ipfsClient.key.import(
      this.keyName,
      key.pem(),
      key.pemPass(),
    );
  }

  async publish() {
    if (this.ipfsPath !== '') {
      assert(this.atlas.index !== 0);
      assert(this.atlas.parentIpfsPath !== '');

      this.atlas.index += 1;
      this.atlas.parentIpfsPath = this.ipfsPath;
    }

    const encryptedAtlas = this.key.encrypt(Buffer.from(JSON.stringify(this.atlas)));

    const ipfsResult = await this.ipfsClient.add(encryptedAtlas);
    assert(Array.isArray(ipfsResult));
    assert(ipfsResult.length === 1);

    this.ipfsPath = `/ipfs/${ipfsResult[0].hash}`;

    const ipnsResult = await this.ipfsClient.name.publish(
      this.ipfsPath,
      { key: this.keyName },
    );

    assert(ipnsResult.value === this.ipfsPath);

    return `/ipns/${ipnsResult.name}`;
  }

  static async createFromFile(
    ipfsClient,
    key,
    ipfsPath,
  ) {
    this.ipfsClient = ipfsClient;
    this.key = key;
    this.ipfsPath = ipfsPath;

    const ipfsResponse = await this.ipfsClient.get(this.ipfsPath);

    const encryptedContent = ipfsResponse.content;

    assert(Buffer.isBuffer(encryptedContent));
    assert(encryptedContent.length !== 0);

    const content = key.decrypt(encryptedContent);

    assert(Buffer.isBuffer(content));
    assert(content.length !== 0);

    const atlas = JSON.parse(content.toString());

    this.atlas = new Atlas(
      atlas.parentIpfsPath,
      atlas.index,
      atlas.safeAddress,
      atlas.recoveryModuleAddress,
      atlas.recoveryPrivateKey,
      atlas.shares,
    );

    this.keyName = 'atlasEncryptionKey';

    this.ipfsClient.key.import(
      this.keyName,
      key.pem(),
      key.pemPass(),
    );
  }

  updateFriendShamirSecret(userAddress, secret) {
    assert(typeof userAddress === 'string');
    assert(userAddress !== '');

    assert(typeof secret === 'string');
    assert(secret !== '');

    this.atlas.shares.userAddress = secret;
  }
}

module.exports = AtlasFile;
