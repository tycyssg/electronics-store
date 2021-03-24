import { UserAuthority } from './UserAuthority';
import { PaymentDetails } from './PaymentDetails';
import { Address } from './Address';

export interface User {
  userId: string
  username: string;
  email: string;
  phoneNo: string;
  password: string;
  role: string;
  authorities: UserAuthority[];
  paymentDetails: PaymentDetails[];
  addresses: Address[];
  isActive: boolean;
  isLocked: boolean;
  lastLoginDate: Date;
  lastLoginDateDisplay: Date;
  joinDate: Date;
  expiresIn: number;
  token: string;
  tokenExpirationDate: Date;
}
