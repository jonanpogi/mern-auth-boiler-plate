import {NextFunction, Request} from 'express';
import {SessionData} from 'express-session';
import jwt from 'jsonwebtoken';
import {store} from '../models';
import {IUsers} from '../models/Users';
import {CustomResponse} from '../types';
import constants from './constants';

const checkAuth = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction,
): Promise<void | CustomResponse> => {
  try {
    // Validate session id
    if (!req.sessionID) {
      throw new Error('Unauthenticated');
    }

    // Check if the JWT token exists in the request header
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new Error('No token provided');
    }

    // Decode the JWT token
    const decodedToken = jwt.verify(token, constants.JWT_SECRET_KEY) as IUsers;

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    // Retrieve the user session from the database
    const session = await new Promise((resolve, reject) => {
      store.get(req.sessionID, (err, session) => {
        if (err) reject(new Error('Error on fetching sessionn'));
        else if (!session) reject(new Error('User session does not exist'));
        resolve(session);
      });
    });

    console.log('User session', session);

    // Verify expiry
    if ((session as SessionData).cookie.expires === new Date()) {
      throw new Error('The user session already expires');
    }

    next();
  } catch (error: any) {
    // todo: redirect to login
    return res
      .status(401)
      .json({success: false, data: {message: error.message}});
  }
};

export default checkAuth;
