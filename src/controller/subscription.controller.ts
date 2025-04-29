import { RequestHandler } from 'express';
import Subscription from '../model/subscription.model';

const createSubscription: RequestHandler = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user?._id,
    });
    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export { createSubscription };
