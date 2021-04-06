import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { AuthUserModel } from '../models/authUser.model';
import * as AddressAction from '../../../auth/store/actions/address.actions';
import * as PaymentAction from '../../../auth/store/actions/payment.actions';
import * as CartActions from '../../../auth/store/actions/cart.actions';

export const initialState: AuthUserModel = {authUser: null as any};


const loginReducer: ActionReducer<AuthUserModel, Action> = createReducer(
  initialState,
  on(AuthActions.GetLoginUserAction, (state: AuthUserModel, action: any) => ({...state, authUser: action.authUser})),
  on(AuthActions.LogOutUserAction, (state: AuthUserModel, action: any) => ({...state, authUser: null as any})),
  on(AuthActions.UpdateUserDetailsAction, (state: AuthUserModel, action: any) => ({
    ...state,
    authUser: {
      ...state.authUser,
      username: action.authUser.username,
      email: action.authUser.email,
      phoneNo: action.authUser.phoneNo
    }
  })),
  on(AddressAction.AddAddressAction, (state: AuthUserModel, action: any) => ({
    ...state,
    authUser: {
      ...state.authUser,
      addresses: [...state.authUser.addresses, action]
    }
  })),
  on(AddressAction.UpdateAddressAction, (state: AuthUserModel, action: any) => {
    const currentAddresses = [...state.authUser.addresses];
    const addressIndex = currentAddresses.findIndex(a => a.addressId === action.addressId);
    return ({
      ...state,
      authUser: {
        ...state.authUser,
        addresses: [
          ...currentAddresses.slice(0, addressIndex),
          {...action},
          ...currentAddresses.slice(addressIndex + 1, currentAddresses.length),
        ]
      }
    })
  }),
  on(AddressAction.DeleteAddressAction, (state: AuthUserModel, action: any) => ({
    ...state,
    authUser: {
      ...state.authUser,
      addresses: state.authUser.addresses.filter(a => a.addressId !== action.id)
    }
  })),
  on(AddressAction.ChangeBillingAddressAction, (state: AuthUserModel, action: any) => {
    const currentAddresses = [...state.authUser.addresses];
    const modifiedAddresses = currentAddresses.map(a => a.addressId === action.id ? {
      ...a,
      billingAddress: true
    } : {...a, billingAddress: false})
    return ({
      ...state,
      authUser: {
        ...state.authUser,
        addresses: modifiedAddresses
      }
    })
  }),
  on(PaymentAction.AddPaymentAction, (state: AuthUserModel, action: any) => ({
    ...state,
    authUser: {
      ...state.authUser,
      paymentDetails: [...state.authUser.paymentDetails, action]
    }
  })),
  on(PaymentAction.DeletePaymentAction, (state: AuthUserModel, action: any) => ({
    ...state,
    authUser: {
      ...state.authUser,
      paymentDetails: state.authUser.paymentDetails.filter(p => p.paymentId !== action.id)
    }
  })),
  on(PaymentAction.ChangePaymentAction, (state: AuthUserModel, action: any) => {
    const currentPayments = [...state.authUser.paymentDetails];
    const modifiedPayments = currentPayments.map(a => a.paymentId === action.id ? {
      ...a,
      defaultPaymentMethod: true
    } : {...a, defaultPaymentMethod: false})

    return ({
      ...state,
      authUser: {
        ...state.authUser,
        paymentDetails: modifiedPayments
      }
    })
  }),
  on(CartActions.AddCartItemAction, (state: AuthUserModel, action: any) => ({
    ...state,
    authUser: {
      ...state.authUser,
      cartItems: [...state.authUser.cartItems, action]
    }
  })),
  on(CartActions.DeleteCartItemAction, (state: AuthUserModel, action: any) => ({
    ...state,
    authUser: {
      ...state.authUser,
      cartItems: state.authUser.cartItems.filter(c => c.cartItemId !== action.id)
    }
  })),
  on(CartActions.UpdateCartItemQuantityPlusAction, (state: AuthUserModel, action: any) => {
    const itemIndex = state.authUser.cartItems.findIndex(c => c.cartItemId === action.id);
    const currentItem = {...state.authUser.cartItems[itemIndex]}

    const updatedItem = {
      ...currentItem,
      productQuantity: currentItem.productQuantity + 1
    }
    return ({
      ...state,
      authUser: {
        ...state.authUser,
        cartItems: [
          ...state.authUser.cartItems.slice(0, itemIndex),
          updatedItem,
          ...state.authUser.cartItems.slice(itemIndex + 1, state.authUser.cartItems.length),
        ]
      }
    })
  }),
  on(CartActions.UpdateCartItemQuantityMinusAction, (state: AuthUserModel, action: any) => {
    const itemIndex = state.authUser.cartItems.findIndex(c => c.cartItemId === action.id);
    const currentItem = {...state.authUser.cartItems[itemIndex]}

    const updatedItem = {
      ...currentItem,
      productQuantity: currentItem.productQuantity - 1
    }
    return ({
      ...state,
      authUser: {
        ...state.authUser,
        cartItems: [
          ...state.authUser.cartItems.slice(0, itemIndex),
          updatedItem,
          ...state.authUser.cartItems.slice(itemIndex + 1, state.authUser.cartItems.length),
        ]
      }
    })
  }),
);


export function getAuthenticatedUserReducer(state: AuthUserModel, action: Action): AuthUserModel {
  return loginReducer(state, action);
}

