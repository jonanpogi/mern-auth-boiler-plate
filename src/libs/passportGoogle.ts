import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import {Users} from '../models';
import {IUsers} from '../models/Users';
import constants from '../utils/constants';

const LOCAL_TUNNEL_URL = 'https://jonan.loca.lt';

// constants
const passportGoogle = passport;
const googleStrategy = GoogleStrategy.Strategy;

// google passport configuration
passport.use(
  new googleStrategy(
    {
      clientID: constants.GOOGLE_CLIENT_ID,
      clientSecret: constants.GOOGLE_CLIENT_SECRET,
      callbackURL: `${LOCAL_TUNNEL_URL}/api/auth/google/callback`,
      // callbackURL: `${constants.BASE_URL}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    async (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: (arg0: null, arg1: unknown) => void,
    ) => {
      try {
        const user = await Users.findOne({googleId: profile.id}).lean();

        if (!user) {
          const newUSer = await Users.create({
            googleId: profile.id,
            displayName: profile.displayName,
            name: {
              givenName: profile.name.givenName,
              familyName: profile.name.familyName,
            },
            role: 'user',
            email: profile.email,
            metaData: [profile],
          });

          return done(null, newUSer);
        }

        return done(null, user);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  ),
);

passportGoogle.serializeUser((user, done) => {
  // Serialize the user ID into the session
  console.log('user', user);
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  // Deserialize the user from the session using the user ID
  const user = await Users.findById(id);
  done(null, user);
});

export default passportGoogle;
