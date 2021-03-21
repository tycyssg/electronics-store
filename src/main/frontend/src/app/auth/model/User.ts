import { UserAuthority } from './UserAuthority';

export interface User {
  userId: string
  clientId: number;
  username: string;
  email: string;
  password: string;
  role: string;
  authorities: UserAuthority[];
  isActive: boolean;
  isLocked: boolean;
  lastLoginDate: Date;
  lastLoginDateDisplay: Date;
  joinDate: Date;
  requiresPasswordChange: boolean;
  expiresIn: number;
  token: string;
  tokenExpirationDate: Date;
}
