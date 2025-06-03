import { Role } from '../../generated/prisma';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        name: string;
        role: Role;
      };
    }
  }
}

export {};
