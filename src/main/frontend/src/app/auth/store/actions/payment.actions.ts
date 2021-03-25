import { createAction, props } from '@ngrx/store';
import { IdModel } from '../../../store/model/id.model';
import { PaymentDetails } from '../../model/PaymentDetails';

export const actionIdentifier = '[App User Payment] active';

export const PaymentTypes = {
  requestAddPayment: `${actionIdentifier} Request add Payment`,
  addPayment: `${actionIdentifier} add Payment`,
  requestDeletePayment: `${actionIdentifier} Request Delete Payment`,
  deletePayment: `${actionIdentifier} Delete Payment`,
  requestDefaultPayment: `${actionIdentifier} Request Change Billing Payment`,
  changeDefaultPayment: `${actionIdentifier} Change Billing Payment`,
};

export const RequestAddPaymentAction = createAction(PaymentTypes.requestAddPayment, props<PaymentDetails>());
export const AddPaymentAction = createAction(PaymentTypes.addPayment, props<PaymentDetails>());

export const RequestDeletePaymentAction = createAction(PaymentTypes.requestDeletePayment, props<IdModel>());
export const DeletePaymentAction = createAction(PaymentTypes.deletePayment, props<IdModel>());

export const RequestChangePaymentAction = createAction(PaymentTypes.requestDefaultPayment, props<IdModel>());
export const ChangePaymentAction = createAction(PaymentTypes.changeDefaultPayment, props<IdModel>());
