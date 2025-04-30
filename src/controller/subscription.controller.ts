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

const getUserSubscriptions: RequestHandler = async (req, res, next) => {
  try {
    if (req.user?._id?.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    const subscriptions = await Subscription.find({ user: req.user?._id });
    res.status(200).json({
      success: true,
      message: 'Subscriptions retrieved successfully',
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export { createSubscription, getUserSubscriptions };
