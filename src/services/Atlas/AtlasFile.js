class AtlasFile {
  // this.key
  // this.ipfsCurrentPath
  // this.safeAddress
  // this.recoveryModuleAddress
  // this.recoveryPrivateKey
  // this.parent
  // this.index
  // this.shares

  // Here we fill all fields from ipfs content.
  static createFromFile(key, ipnsAddress, ipfsPath) {}

  // this.ipfsCurrentPath = "", this.parent = "", this.index = 0, this.shares = {}
  static create(key, ipnsAddress, safeAddress, recoveryModuleAddress, recoveryPrivateKey) {}

  addFriendSSS(username, sss) {}

  // update this.parent, update this.index, update this.ipfsCurrentPath
  publish() {}
}

module.exports = AtlasFile;
