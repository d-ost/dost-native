class Key {
  // this.username
  // this.pin
  // this.salt
  // this.key

  constructor(username, pin) {
    this.username = username;
    this.pin = pin;

    const userSecret = Key._generateUserSecret(this.username, this.pin);

    this.salt = Key._generateSalt();

    this.key = Key._generateKey(userSecret, this.salt);
  }

  encrypt(data) {}

  static _generateUserSecret(username, pin) {}

  static _generateSalt() {}

  static _generateKey(userSecret, salt) {}
}

module.exports = Key;
