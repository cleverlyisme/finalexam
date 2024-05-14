const { getStorage } = require("firebase-admin/storage");
const { initializeApp, cert } = require("firebase-admin/app");

const environments = require("../utils/environments");

initializeApp({
  credential: cert({
    type: environments.FIREBASE_TYPE,
    project_id: environments.FIREBASE_PROJECT_ID,
    private_key_id: environments.FIREBASE_PRIVATE_KEY_ID,
    private_key: environments.FIREBASE_PRIVATE_KEY,
    client_email: environments.FIREBASE_CLIENT_EMAIL,
    client_id: environments.FIREBASE_CLIENT_ID,
    auth_uri: environments.FIREBASE_AUTH_URI,
    token_uri: environments.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      environments.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: environments.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: environments.FIREBASE_UNIVERSE_DOMAIN,
  }),
  storageBucket: environments.FIREBASE_STORAGE_BUCKET,
});

const storage = getStorage().bucket();

module.exports = storage;
