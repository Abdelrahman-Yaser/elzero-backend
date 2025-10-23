import { IUserPayload } from '@modules/auth/interface/user';

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}
