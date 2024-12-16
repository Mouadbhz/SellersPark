import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
  LOGOUT, 
  SET_PERSON_TYPE,
  ID_CLIENT_SUCCESS,
  ID_VENDOR_SUCCESS,
  ID_VENDOR_FAIL
} from '../actions/types';

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  // isAuthenticated: localStorage.getItem('access') ? true : null,
  isAuthenticated: null,
  user: null, 
  userType: null, // Add userType field
  persontype: localStorage.getItem('persontype'),
  idClient: localStorage.getItem('idClient'),
  idVendor: localStorage.getItem('idVendor'),
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        
      }
    case LOGIN_SUCCESS:
    case GOOGLE_AUTH_SUCCESS:
    case FACEBOOK_AUTH_SUCCESS:
      localStorage.setItem('access', payload.access);
      // localStorage.setItem('refresh', payload.refresh);//add
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh
      }
    case SIGNUP_SUCCESS:
      return {
          ...state,
          isAuthenticated: false
      }
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload.user,
        userType: payload.userType
      }
    case AUTHENTICATED_FAIL:
      return {
          ...state,
          isAuthenticated: false
      }
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null
      }
    case GOOGLE_AUTH_FAIL:
    case FACEBOOK_AUTH_FAIL:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('persontype');
      localStorage.removeItem('idClient');
      localStorage.removeItem('idVendor');
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
      }
    
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
        return {
          ...state
        }
    case SET_PERSON_TYPE:
      localStorage.setItem('persontype', payload); // Update userType in local storage
        return {
          ...state,
          persontype: payload,
        };
    case ID_CLIENT_SUCCESS:
      localStorage.setItem('idClient', payload);
        return {
          ...state,
          idClient: payload,
        };
    case ID_VENDOR_SUCCESS:
      localStorage.setItem('idVendor', payload);
        return {
          ...state,
          idVendor: payload,
        };
    case ID_VENDOR_FAIL:
      localStorage.setItem('idVendor', '0'); // Store '0' as string
        return {
          ...state,
          idVendor: 0,
        };
     default:
       return state;
  }
  
}

