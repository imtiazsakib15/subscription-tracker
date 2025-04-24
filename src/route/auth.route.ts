import { Router } from 'express';
import { signUp } from '../controller/auth.controller';

const authRouter = Router();

authRouter.post('/sign-up', signUp);

export default authRouter;
