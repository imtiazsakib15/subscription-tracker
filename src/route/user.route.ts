import { Router } from 'express';
import { getUser } from '../controller/user.controller';
import authorize from '../middleware/auth.middleware';

const userRouter = Router();

userRouter.get('/:id', authorize, getUser);

export default userRouter;
