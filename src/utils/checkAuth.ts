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
    const user = await Users.aggregate([
      {
        $match:
          /**
           * query: The query in MQL.
           */
          {googleId: decodedToken.id},
      },
      {
        $lookup:
          /**
           * from: The target collection.
           * localField: The local join field.
           * foreignField: The target join field.
           * as: The name for the results.
           * pipeline: Optional pipeline to run on the foreign collection.
           * let: Optional variables to use in the pipeline field stages.
           */
          {
            from: 'sessions',
            localField: 'googleId',
            foreignField: 'session.passport.user.googleId',
            as: 'sessions',
          },
      },
    ]);

    console.log('User session', user);

    if (user[0].sessions.length === 0) {
      throw new Error('The user session does not exist');
    }

    // Verify expiry
    if (user[0].sessions[0].expires === new Date()) {
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
