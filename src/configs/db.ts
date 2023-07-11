import mongoose from 'mongoose';
import {constants} from '../utils';

mongoose
  .connect(constants.MONGODB_URL, {
    dbName: constants.MONGODB_DB,
    autoIndex: constants.MONGODB_AUTO_INDEX || false,
  })
  .then(() => console.info('🌱🌱🌱 MongoDB is Connected. 🌱🌱🌱'))
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

export default db;
