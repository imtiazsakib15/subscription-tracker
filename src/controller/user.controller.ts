import { RequestHandler } from 'express';
import User from '../model/user.model';

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) throw new Error('User not found');

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export { getUser };
