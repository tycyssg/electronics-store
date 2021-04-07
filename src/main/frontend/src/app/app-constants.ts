// ##########################################
// #             App Constants              #
// ##########################################

import { HttpHeaders } from '@angular/common/http';

export const HEADERS_FOR_POST = new HttpHeaders({
  'Content-Type': 'application/json;charset=utf-8',
  Accept: 'application/json',
  responseType: 'json'
});
// ##########################################
// #          General Constants             #
// ##########################################
export const APP_NAME = 'unitch'
export const LOGO_TEXT = 'unitch';

export const NOTIFICATION_TYPES = {
  default: 'default',
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
}
// ##########################################
// #            Constants                   #
// ##########################################
export const DEFAULT_ERROR_MESSAGE = 'An unknown error occurred!';
export const DEFAULT_CONFIRM_MESSAGE = 'Are you sure you want to delete this item?';
export const NO_SERVER_ACCESS_ERROR = 'Oops! We could not reach our server. Please try again later';
export const UNAUTHORIZED_ACCESS_ERROR = 'Oops! You are not authorized to access that page!';
export const FORBIDDEN_ACCESS_ERROR_INACTIVE = 'Oops! Access restricted. Your account was deactivated';
export const FORBIDDEN_ACCESS_ERROR_BLOCK = 'Oops! Access restricted. Your account was blocked';
//User
export const USER_REGISTERED = 'Your account was successfully created!';
export const USER_LOGGED_OUT = 'Your successfully logged out!';
export const USER_UPDATED = 'Details successfully updated!';
//Address
export const ADDRESS_ADDED = 'Address successfully registered!';
export const ADDRESS_UPDATED = 'Address successfully updated!';
export const ADDRESS_DELETED = 'Address successfully deleted!';
export const ADDRESS_BILLED_CHANGED = 'Billed address successfully changed!';
//Payment
export const PAYMENT_ADDED = 'PAYMENT successfully registered!';
export const PAYMENT_DELETED = 'PAYMENT successfully deleted!';
export const PAYMENT_DEFAULT_CHANGED = 'Default payment successfully changed!';
//Category
export const CATEGORY_ADDED = 'Category successfully added!';
export const CATEGORY_DELETED = 'Category successfully deleted!';
export const CATEGORY_UPDATED = 'Category successfully  updated!';
//Category
export const PRODUCT_ADDED = 'Product successfully added!';
export const PRODUCT_DELETED = 'Product successfully deleted!';
export const PRODUCT_UPDATED = 'Product successfully  updated!';
export const PRODUCT_STOCK_UPDATED = 'Product stock successfully  updated!';
export const PRODUCT_RATED_UPDATED = 'Rating successfully received!';
export const PRODUCT_REVIEW_ADD = 'Your review was successfully received!';
//CART
export const ITEM_ADDED = 'Item was successfully add into cart';
export const ORDER_PLACED = 'Order successfully placed!';


// ##########################################
// #          Routing Constants             #
// ##########################################
export const ROUTE_PATH_DEFAULT = '';
export const ROUTE_PATH_LOGIN = 'login';
export const ROUTE_PATH_ERROR = 'error';
export const ROUTE_PATH_NOT_FOUND = '404';
export const ROUTE_PATH_UNKNOWN = '**';
export const ROUTE_PATH_LOGIN_REDIRECT = 'landing';
export const ROUTE_PATH_CPANEL = 'cpanel';
export const ROUTE_PATH_USER = 'user';
export const ROUTE_PATH_DISPLAY_PRODUCTS = 'products';
export const ROUTE_PATH_DISPLAY_SALE_PRODUCTS = 'sale-products';
export const ROUTE_PATH_CP_EDIT_PRODUCT = 'edit-product/';
export const ROUTE_PATH_USER_PROFILE = 'profile';
export const ROUTE_PATH_USER_CART = 'cart';
export const ROUTE_PATH_USER_CHECKOUT = 'checkout';
export const ROUTE_PATH_USER_CHECKOUT_COMPLETE = 'checkout-complete';

// ##########################################
// #             NGRX Constants             #
// ##########################################
export const NGRX_STATE_FEATURE_AUTH = 'auth';
export const NGRX_STATE_FEATURE_APP = 'app';
export const NGRX_STATE_CPANEL_APP = 'cpanel';



// ##########################################
// #        Selects Options Constants       #
// ##########################################
export const OPTION_ROLES = {
  ROLE_USER: 'Client',
  SUPER_ADMIN: 'Admin'
}
