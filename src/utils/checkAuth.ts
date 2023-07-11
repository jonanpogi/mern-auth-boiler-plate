import {NextFunction, Request} from 'express';
import jwt from 'jsonwebtoken';
import {Users} from '../models';
import {IUsers} from '../models/Users';
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

    if (!token) {
      throw new Error('No token provided');
    }

    // Decode the JWT token
    const decodedToken = jwt.verify(token, constants.JWT_SECRET_KEY) as IUsers;

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    // Retrieve the user session from the database
    const user = await Users.findOne({googleId: decodedToken.googleId});

    if (!user) {
      throw new Error('User session does not exist');
    }

    next();
  } catch (error: any) {
    return res
      .status(401)
      .json({success: false, data: {message: error.message}});
  }
};

export default checkAuth;
