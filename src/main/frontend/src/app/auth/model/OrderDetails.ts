import { Address } from './Address';
import { PaymentDetails } from './PaymentDetails';
import { ProductOrder } from './ProductOrder';

export interface OrderDetails {
  orderId?: number;
  products: ProductOrder[];
  address: Address;
  payment: PaymentDetails;
  orderDate: Date;
  orderTotal: number;
  userId: number;
}
