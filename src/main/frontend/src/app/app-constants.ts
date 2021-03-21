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
//PROJECT
export const PROJECT_ADD_SUCCESS = 'Project successfully created!';
export const PROJECT_DELETE_SUCCESS = 'Project successfully deleted!';
//MAPS
export const MAP_ADD_SUCCESS = 'Map successfully created!';
export const MAP_UPDATE_SUCCESS = 'Map successfully updated!';
export const MAP_DELETE_SUCCESS = 'Map successfully deleted!';
//MAP PROCESSES
export const MAP_PROCESS_ADD_SUCCESS = 'Map Process successfully created!';
export const MAP_PROCESS_UPDATE_SUCCESS = 'Map Process successfully updated!';
export const MAP_PROCESS_DELETE_SUCCESS = 'Map Process successfully deleted!';
//MAP LINKS
export const MAP_LINK_ADD_SUCCESS = 'Link successfully created!';
export const MAP_LINK_UPDATE_SUCCESS = 'Link successfully updated!';
export const MAP_LINK_DELETE_SUCCESS = 'Link successfully deleted!';
//APP ACTORS
export const ACTOR_ADD_SUCCESS = 'Actor successfully created!';
export const ACTOR_DELETE_SUCCESS = 'Actor successfully deleted!';
//MAP ACTORS
export const MAP_ACTOR_ADD_SUCCESS = 'Map Actor successfully created!';
export const MAP_ACTOR_DELETE_SUCCESS = 'Map Actor successfully deleted!';
//NODES
export const NODE_ADD_SUCCESS = 'Node successfully created!';
export const NODE_SYNC_SUCCESS = 'Node successfully synced!';
export const NODE_UPDATE_SUCCESS = 'Node successfully updated!';
export const NODE_DELETE_SUCCESS = 'Node successfully deleted!';
//NODE ACTORS
export const NODE_ACTOR_ADD_SUCCESS = 'Node Actor successfully created!';
export const NODE_ACTOR_DELETE_SUCCESS = 'Node Actor successfully deleted!';
//APP LABELS
export const LABEL_ADD_SUCCESS = 'Label successfully created!';
export const LABEL_DELETE_SUCCESS = 'Label successfully deleted!';
//DATA OBJECTS AND ATTRIBUTES
export const OBJECT_ADD_SUCCESS = 'Object successfully created!';
export const OBJECT_UPDATE_SUCCESS = 'Object successfully updated!';
export const OBJECT_DELETE_SUCCESS = 'Object successfully deleted!';
export const ATTRIBUTE_ADD_SUCCESS = 'Attribute successfully created!';
export const ATTRIBUTE_UPDATE_SUCCESS = 'Attribute successfully updated!';
export const ATTRIBUTE_DELETE_SUCCESS = 'Attribute successfully deleted!';
//TIMELINE OBJECTS
export const TIMELINE_OBJECT_ASSIGN_SUCCESS = 'Object successfully assigned!';
export const TIMELINE_OBJECT_UPDATE_SUCCESS = 'Timeline object successfully updated!';
export const TIMELINE_OBJECT_LOCATION_SUCCESS = 'Object location successfully updated!';
export const TIMELINE_OBJECT_DELETE_SUCCESS = 'Timeline object successfully unassigned!';
export const TIMELINE_ATTRIBUTE_UPDATE_SUCCESS = 'Timeline attribute successfully configured!';
export const TIMELINE_ATTRIBUTE_METHOD_UPDATE_SUCCESS = 'Timeline attribute methods successfully configured!';
//NODES METHODS
export const NODE_METHOD_ADD_SUCCESS = 'Method successfully created!';
export const NODE_METHOD_UPDATE_SUCCESS = 'Method successfully updated!';
export const NODE_METHOD_DELETE_SUCCESS = 'Method successfully deleted!';
//TIMELINE ENTRANCES
export const TIMELINE_ENTRANCE_ADD_SUCCESS = 'Entrance successfully created!';
export const TIMELINE_ENTRANCE_UPDATE_SUCCESS = 'Entrance successfully updated!';
export const TIMELINE_ENTRANCE_DELETE_SUCCESS = 'Entrance successfully deleted!';
//TIMELINE EXITS
export const TIMELINE_EXIT_ADD_SUCCESS = 'Exit successfully created!';
export const TIMELINE_EXIT_UPDATE_SUCCESS = 'Exit successfully updated!';
export const TIMELINE_EXIT_DELETE_SUCCESS = 'Exit successfully deleted!';
//TIMELINE URL
export const TIMELINE_URL_ADD_SUCCESS = 'Url successfully created!';
export const TIMELINE_URL_UPDATE_SUCCESS = 'Url successfully updated!';
export const TIMELINE_URL_DELETE_SUCCESS = 'Url successfully deleted!';


// ##########################################
// #          Routing Constants             #
// ##########################################
export const ROUTE_PATH_DEFAULT = '';
export const ROUTE_PATH_LOGIN = 'login';
export const ROUTE_PATH_ERROR = 'error';
export const ROUTE_PATH_NOT_FOUND = '404';
export const ROUTE_PATH_UNKNOWN = '**';
export const ROUTE_PATH_NEW = 'new';
export const ROUTE_PATH_ALL = 'all';
export const ROUTE_PATH_LOGIN_REDIRECT = 'landing';
export const ROUTE_PATH_APP_ACTORS = 'app-actors';
export const ROUTE_PATH_APP_LABELS = 'app-labels';
export const ROUTE_PATH_PROJECTS = 'project';
export const ROUTE_PATH_MAP = 'map';
export const ROUTE_PATH_MAP_PROCESS = 'processes';
export const ROUTE_PATH_MAP_LINKS = 'links';
export const ROUTE_PATH_NODE = 'node';
export const ROUTE_PATH_NODE_OBJECT = 'timeline-objects';
export const ROUTE_PATH_NODE_ENTRANCE = 'timeline-entrances';
export const ROUTE_PATH_NODE_EXIT = 'timeline-exits';
export const ROUTE_PATH_NODE_SETUP = 'timeline-setups';
export const ROUTE_PATH_NODE_METHODS = 'timeline-methods';
export const ROUTE_PATH_NODE_URLS = 'timeline-urls';
export const ROUTE_PATH_DATA_OBJECT = 'object';
export const ROUTE_PATH_TESTING = 'tests';
export const ROUTE_PATH_TESTING_FIND_PATHS = 'find-paths';
export const ROUTE_PATH_REPORTS = 'reports';
export const ROUTE_PATH_REPORTS_VIEW_RESULTS = 'view-results';


// ##########################################
// #             NGRX Constants             #
// ##########################################
export const NGRX_STATE_FEATURE_AUTH = 'auth';
export const NGRX_STATE_FEATURE_APP = 'app';
export const NGRX_STATE_CORE_APP = 'core';
export const NGRX_STATE_PROJECT_APP = 'projects';
export const NGRX_STATE_MAP_APP = 'map-state';
export const NGRX_STATE_NODE_APP = 'node-state';
export const NGRX_STATE_REPORTS_APP = 'reports-state';


// ##########################################
// #        Selects Options Constants       #
// ##########################################
export const SELECT_OPTION_ROLES = [
  {roleType: 'ROLE_USER', roleFriendly: 'User'},
  {roleType: 'ROLE_DEVELOPER', roleFriendly: 'Developer'},
  {roleType: 'ROLE_ADMIN', roleFriendly: 'Admin'},
]
