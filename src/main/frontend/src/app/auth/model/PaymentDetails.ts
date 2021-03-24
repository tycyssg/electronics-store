export interface PaymentDetails {
  paymentId: number;
  cardNo: string;
  expireDate: string;
  cvv: string;
  defaultPaymentMethod: boolean;
  userId: number;
}
