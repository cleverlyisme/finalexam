const dotenv = require("dotenv");

dotenv.config();

const environments = {
  ENVIRONMENT: process.env.ENVIRONMENT || "DEVELOPMENT",
  PUBLIC_URL: process.env.PUBLIC_URL,
  PORT: process.env.PORT,
  MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  APP_EMAIL: process.env.APP_EMAIL,
  APP_EMAIL_EXPIRE: process.env.APP_EMAIL_EXPIRE,
  APP_PASSWORD: process.env.APP_PASSWORD,
  FIREBASE_TYPE: process.env.FIREBASE_TYPE,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL:
    process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_CLIENT_X509_CERT_URL: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  FIREBASE_UNIVERSE_DOMAIN: process.env.FIREBASE_UNIVERSE_DOMAIN,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
};

module.exports = environments;
