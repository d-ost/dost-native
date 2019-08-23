class AccessFile {
  // this.atlasIpnsAddress
  // this.salt

  static createFromFile(filePath) {}

  static create(atlasIpfsAddress, salt) {}

  createSSS(partCount, threshold) {}

  recoverFromSSS(parts) {}

  serialize() {}
}

module.exports = AccessFile;
