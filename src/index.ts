import express, {Request} from 'express';
import session from 'express-session';
import passport from 'passport';
import db from './configs/db';
import store from './models/store';
import {Auth} from './routes';
import {CustomResponse} from './types';
import checkAuth from './utils/checkAuth';
import constants from './utils/constants';

// constants
const PORT = 3000;
const app = express();

// session store handler
store.on('error', error => {
  console.error('MongoDB session store error:', error);
});

// db handler
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// middle-wares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  session({
    secret: constants.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api/auth', Auth);

// checks server heatlh
app.get('/api/health', checkAuth, (req: Request, res: CustomResponse) => {
  res.status(200).json({success: true, data: {message: 'The server is up'}});
});

// initialize express server
app.listen(PORT, () =>
  console.log(`🚀 🚀 🚀 App running in port ${PORT} 🚀 🚀 🚀`),
);
