// types/express/index.d.ts
import { IUser } from '../../interface/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<IUser, '_id'>;
    }
  }
}
