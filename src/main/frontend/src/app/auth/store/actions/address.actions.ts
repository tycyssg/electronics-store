import { createAction, props } from '@ngrx/store';
import { Address } from '../../model/Address';
import { IdModel } from '../../../store/model/id.model';

export const actionIdentifier = '[App User Address] active';

export const AddressTypes = {
  requestAddAddress: `${actionIdentifier} Request add address`,
  addAddress: `${actionIdentifier} add address`,
  requestUpdateAddress: `${actionIdentifier} Request update address`,
  updateAddress: `${actionIdentifier} update address`,
  requestDeleteAddress: `${actionIdentifier} Request Delete address`,
  deleteAddress: `${actionIdentifier} Delete address`,
  requestChangeBillingAddress: `${actionIdentifier} Request Change Billing address`,
  changeBillingAddress: `${actionIdentifier} Change Billing address`,
};

export const RequestAddAddressAction = createAction(AddressTypes.requestAddAddress, props<Address>());
export const AddAddressAction = createAction(AddressTypes.addAddress, props<Address>());

export const RequestUpdateAddressAction = createAction(AddressTypes.requestUpdateAddress, props<Address>());
export const UpdateAddressAction = createAction(AddressTypes.updateAddress, props<Address>());

export const RequestDeleteAddressAction = createAction(AddressTypes.requestDeleteAddress, props<IdModel>());
export const DeleteAddressAction = createAction(AddressTypes.deleteAddress, props<IdModel>());

export const RequestChangeBillingAction = createAction(AddressTypes.requestChangeBillingAddress, props<IdModel>());
export const ChangeBillingAddressAction = createAction(AddressTypes.changeBillingAddress, props<IdModel>());
