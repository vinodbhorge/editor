(function (global) {
  try {
    if (!global.jsonld) {
      global.jsonld = {};
    }
  } catch (e) {
    // ignore
  }

  try {
    if (!global['crypto-ld']) {
      function Ed25519KeyPair() {}
      global['crypto-ld'] = { Ed25519KeyPair: Ed25519KeyPair };
    }
  } catch (e) {
    // ignore
  }
})(typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : this));
