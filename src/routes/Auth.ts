import express, {Request} from 'express';
import jwt from 'jsonwebtoken';
import constants from '../utils/constants';
import {CustomResponse} from '../types';
import {passportGoogle} from '../libs';
import {store} from '../models';

const router = express.Router();

// direct user to google sign-in
router.get(
  '/google',
  passportGoogle.authenticate('google', {scope: ['email', 'profile']}),
);

// logout
router.get('/logout', (req: Request, res: CustomResponse) => {
  req.session.destroy(err => {
    if (err) {
      return res
        .status(500)
        .json({success: false, data: {message: 'Error on destroying session'}});
    }

    store.destroy(req.sessionID, err => {
      if (err) {
        return res
          .status(500)
          .json({success: false, data: {message: 'Error on removing session'}});
      }

      res.clearCookie(constants.SESSION_COOKIE_NAME);

      return res
        .status(200)
        .json({success: true, data: {message: 'Logout success'}});
    });
  });
});

// google-callback
router.get(
  '/google/callback',
  passportGoogle.authenticate('google', {
    successRedirect: '/api/auth/google/success',
    failureRedirect: '/api/auth/google/failure',
  }),
);

// google-callback-success
router.get('/google/success', (req: Request, res: CustomResponse) => {
  // Check if user is authenticated before generating the token
  if (
    !req.session ||
    !(req.session as any).passport ||
    !(req.session as any).passport.user
  ) {
    return res
      .status(401)
      .json({success: false, data: {message: 'Unauthorized'}});
  }

  const user = (req.session as any).passport.user;

  console.log(
    'session data',
    (req.session as any).passport.user,
    constants.JWT_SECRET_KEY,
  );

  // generate jwt and return to user
  const token = jwt.sign({id: user.googleId}, constants.JWT_SECRET_KEY, {
    expiresIn: constants.JWT_EXPIRES_IN,
  });
  res.status(200).json({success: true, data: {token}});
});

// google-callback-failure
router.get('/google/failure', (req: Request, res: CustomResponse) => {
  res.status(400).json({success: false, data: {message: 'Failed to login'}});
});

export default router;
