export interface PaymentDetails {
  paymentId: number;
  cardNo: string;
  cardNoDisplay: string;
  expireDate: string;
  cvv: string;
  defaultPaymentMethod: boolean;
  userId: number;
}
