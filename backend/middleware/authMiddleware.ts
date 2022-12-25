import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import  User  from '../models/userModel'

import { NextFunction, Response } from 'express';


const protect = asyncHandler(
  async (req: any , res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];

        if (process.env.JWT_SECRET) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          if (typeof decoded === 'object' && decoded.id) {
            // The decoded variable is an object with an id property, so you can safely access it

            req.user = await User.findById(decoded.id).select('-password').lean() 
            
            next();
          } else {
            console.error('Invalid JWT payload');
            res.status(401);
            throw new Error('Not authorized, invalid token');
          }


          next();
        } else {
          console.error('JWT secret is not defined');
          res.status(500);
          throw new Error('Server error');
        }
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

const admin = (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };