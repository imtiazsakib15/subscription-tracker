import { RequestHandler } from 'express';
import User from '../model/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

const signUp: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      throw new Error('Please provide all required fields');

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!newUser) throw new Error('User creation failed');

    newUser.password = '';

    const token = jwt.sign({ userId: newUser._id }, config.JWT_SECRET!, {
      expiresIn: config.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      message: 'User created',
      data: { user: newUser, token },
    });
  } catch (error) {
    next(error);
  }
};

const signIn: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new Error('Please provide all required fields');

    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    user.password = '';

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET!, {
      expiresIn: config.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn };
