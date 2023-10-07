import {NextFunction, Request} from 'express';
import jwt from 'jsonwebtoken';
import {CustomResponse} from '../types';
import constants from './constants';

const checkAuth = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction,
): Promise<void | CustomResponse> => {
  try {
    // Check if the JWT token exists in the request header
    const token = req.headers.authorization?.replace('Bearer ', '');

    // Validate session id
    if (!req.isAuthenticated() || !token) {
      throw new Error('Unauthenticated');
    }

    // Decode the JWT token
    const decodedToken = jwt.verify(token, constants.JWT_SECRET_KEY);

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    // Verify expiry
    if (req.session.cookie.expires!.getTime() < new Date().getTime()) {
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
