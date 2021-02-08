module.exports = {
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || "",
    REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN || "",
  },
  TWILIO: {
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
    PRIMARY_PHONE_NUMBER: process.env.TWILIO_PRIMARY_PHONE_NUMBER || "",
  },
  MONGO: {
    URI: process.env.MONGODB_URI || "mongodb://localhost/homy",
  },
  STRIPE: {
    SECRET_KEY: process.env.HOMY_STRIPE_SECRET_KEY,
  },
  SERVER: {
    PORT: process.env.PORT || 3008,
    EMAIL: process.env.HOMY_DEV_EMAIL,
    PHONE: process.env.HOMY_DEV_PHONE,
  },
  TOGGLES: {
    DISABLE_NOTIFICATION: process.env.HOMY_DISABLE_NOTIFICATION || false,
  },
  JWT: {
    SECRET_KEY: process.env.JWT_SECRET_KEY || "jwtPrivateKey",
    EMAIL_SECRET_KEY: process.env.JWT_EMAIL_SECRET_KEY || "jwtPrivateKeyEmail",
  },
};
