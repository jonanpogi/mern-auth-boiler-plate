"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = __importDefault(require("passport-google-oauth2"));
const constants_1 = __importDefault(require("../utils/constants"));
const LOCAL_TUNNEL_URL = 'https://jonan.loca.lt';
// constants
const passportGoogle = passport_1.default;
const googleStrategy = passport_google_oauth2_1.default.Strategy;
// google passport configuration
passport_1.default.use(new googleStrategy({
    clientID: constants_1.default.GOOGLE_CLIENT_ID,
    clientSecret: constants_1.default.GOOGLE_CLIENT_SECRET,
    callbackURL: `${LOCAL_TUNNEL_URL}/api/auth/google/callback`,
    // callbackURL: `${constants.BASE_URL}/api/auth/google/callback`,
    passReqToCallback: true,
}, (request, accessToken, refreshToken, profile, done) => {
    // TODO: insert or find user
    done(null, profile);
}));
passportGoogle.serializeUser((user, done) => {
    // Serialize the user ID into the session
    console.log('user', user);
    done(null, user);
});
passportGoogle.deserializeUser((user, done) => {
    // Deserialize the user from the session using the user ID
    console.log('user', user);
    done(null, user);
});
exports.default = passportGoogle;
