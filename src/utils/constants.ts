import dotenv from 'dotenv';

dotenv.config();

const constants = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  BASE_URL: process.env.BASE_URL as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY as string,
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME as string,
  SESSION_EXPIRY_MAX_AGE: process.env.SESSION_EXPIRY_MAX_AGE as string,
  MONGODB_URL: process.env.MONGODB_URL as string,
  MONGODB_DB: process.env.MONGODB_DB as string,
  MONGODB_AUTO_INDEX: process.env.MONGODB_AUTO_INDEX as unknown as boolean,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
};

export default constants;
