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
export const USER_REGISTERED_FAIL = 'Register Failed! Please try again';


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

// ##########################################
// #             NGRX Constants             #
// ##########################################
export const NGRX_STATE_FEATURE_AUTH = 'auth';
export const NGRX_STATE_FEATURE_APP = 'app';
export const NGRX_STATE_CORE_APP = 'core';



// ##########################################
// #        Selects Options Constants       #
// ##########################################
export const OPTION_ROLES = {
  USER_AUTHORITIES: 'Client',
  SUPER_ADMIN_AUTHORITIES: 'Admin'
}
