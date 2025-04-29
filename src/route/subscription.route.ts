import { Router } from 'express';
import authorize from '../middleware/auth.middleware';
import { createSubscription } from '../controller/subscription.controller';

const subscriptionRouter = Router();

subscriptionRouter.post('/', authorize, createSubscription);

export default subscriptionRouter;
