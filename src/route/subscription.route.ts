import { Router } from 'express';
import authorize from '../middleware/auth.middleware';
import {
  createSubscription,
  getUserSubscriptions,
} from '../controller/subscription.controller';

const subscriptionRouter = Router();

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.get('/:id', authorize, getUserSubscriptions);

export default subscriptionRouter;
