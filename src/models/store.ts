import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import constants from '../utils/constants';

const mongoDBStore = MongoDBStore(session);

const store = new mongoDBStore({
  uri: constants.MONGODB_URL,
  databaseName: 'rids',
  collection: 'sessions',
  expires: parseInt(constants.SESSION_EXPIRY_MAX_AGE),
});

export default store;
