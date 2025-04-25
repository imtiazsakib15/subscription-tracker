import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../model/user.model';
import { RequestHandler } from 'express';

const authorize: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decoded = jwt.verify(token, config.JWT_SECRET!);
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error('User not found');
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
      error,
    });
  }
};

export default authorize;
