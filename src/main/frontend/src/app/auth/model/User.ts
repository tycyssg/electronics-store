import { UserAuthority } from './UserAuthority';

export interface User {
  userId: string
  username: string;
  email: string;
  phoneNo: string;
  password: string;
  role: string;
  authorities: UserAuthority[];
  isActive: boolean;
  isLocked: boolean;
  lastLoginDate: Date;
  lastLoginDateDisplay: Date;
  joinDate: Date;
  expiresIn: number;
  token: string;
  tokenExpirationDate: Date;
}
