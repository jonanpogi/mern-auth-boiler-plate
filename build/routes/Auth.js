'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
const express_1 = __importDefault(require('express'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const constants_1 = __importDefault(require('../utils/constants'));
const libs_1 = require('../libs');
const router = express_1.default.Router();
// direct user to google sign-in
router.get(
  '/google',
  libs_1.passportGoogle.authenticate('google', {scope: ['email', 'profile']}),
);
// logout
router.get('/logout', (req, res) => {
  res.status(200).json({success: true, data: {message: 'Logout success'}});
});
// google-callback
router.get(
  '/google/callback',
  libs_1.passportGoogle.authenticate('google', {
    successRedirect: '/api/auth/google/success',
    failureRedirect: '/api/auth/google/failure',
  }),
);
// google-callback-success
router.get('/google/success', (req, res) => {
  // Check if user is authenticated before generating the token
  if (!req.session || !req.session.passport || !req.session.passport.user) {
    return res
      .status(401)
      .json({success: false, data: {message: 'Unauthorized'}});
  }
  const user = req.session.passport.user;
  console.log('session data', req.session.passport.user);
  // generate jwt and return to user
  const token = jsonwebtoken_1.default.sign(
    user,
    constants_1.default.JWT_SECRET_KEY,
    {
      expiresIn: constants_1.default.JWT_EXPIRES_IN,
    },
  );
  res.status(200).json({success: true, data: {token}});
});
// google-callback-failure
router.get('/google/failure', (req, res) => {
  res.status(400).json({success: false, data: {message: 'Failed to login'}});
});
exports.default = router;
