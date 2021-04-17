import { Address } from './Address';
import { PaymentDetails } from './PaymentDetails';
import { ProductOrder } from './ProductOrder';
import { CouponModel } from '../../cpanel/model/coupon.model';

export interface OrderDetails {
  orderId?: number;
  products: ProductOrder[];
  address: Address;
  payment: PaymentDetails;
  orderDate: Date;
  orderTotal: number;
  coupon: CouponModel;
  userId: number;
}
