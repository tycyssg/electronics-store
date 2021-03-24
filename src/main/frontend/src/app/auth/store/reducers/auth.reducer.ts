import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { AuthUserModel } from '../models/authUser.model';
import * as AddressAction from '../../../auth/store/actions/address.actions';

export const initialState: AuthUserModel = {authUser: null as any};


const loginReducer: ActionReducer<AuthUserModel, Action> = createReducer(
  initialState,
  on(AuthActions.GetLoginUserAction, (state: AuthUserModel, action: any) => ({...state, authUser: action.authUser})),
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
);


const logoutReducer: ActionReducer<AuthUserModel, Action> = createReducer(
  initialState,
  on(AuthActions.LogOutUserAction, (state: AuthUserModel, action: any) => ({...state, authUser: null as any}))
);


export function getAuthenticatedUserReducer(state: AuthUserModel, action: Action): AuthUserModel {
  return loginReducer(state, action);
}

export function logOutReducer(state: AuthUserModel, action: Action): AuthUserModel {
  return logoutReducer(state, action);
}
