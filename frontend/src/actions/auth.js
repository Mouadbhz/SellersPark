import axios from 'axios';
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
} from './types';

export const load_user = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config); // --------------
        // console.log("res"+res)
        // console.log("config"+config)

        dispatch({
            type: USER_LOADED_SUCCESS,
            payload: {
              user: res.data,
            }
        });
    } catch (err) {
      // console.log("err"+err)
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
} else {
    dispatch({
        type: USER_LOADED_FAIL
    });
}
};

export const googleAuthenticate = (state, code) => async dispatch => {
  if (state && code && !localStorage.getItem('access')) {
      const config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      };

      const details = {
          'state': state,
          'code': code
      };

      const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

      try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);
          // console.log("res"+res)

          dispatch({
              type: GOOGLE_AUTH_SUCCESS,
              payload: res.data
          });

          dispatch(load_user());
      } catch (err) {
        // console.log(err)
          dispatch({
              type: GOOGLE_AUTH_FAIL
          });
      }
  }
};

export const facebookAuthenticate = (state, code) => async dispatch => {
  if (state && code && !localStorage.getItem('access')) {
      const config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      };

      const details = {
          'state': state,
          'code': code
      };

      const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

      try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`, config);

          dispatch({
              type: FACEBOOK_AUTH_SUCCESS,
              payload: res.data
          });

          dispatch(load_user());
      } catch (err) {
          dispatch({
              type: FACEBOOK_AUTH_FAIL
          });
      }
  }
};

export const checkAuthenticated = () => async dispatch => {
  if (localStorage.getItem('access')) {
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      }; 

      const body = JSON.stringify({ token: localStorage.getItem('access') });

      try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config) // ----------
          // console.log("res"+res)

          if (res.data.code !== 'token_not_valid') {
              dispatch({
                  type: AUTHENTICATED_SUCCESS
              });
              // Dispatch the load_user action here
              dispatch(load_user());
          } else {
              dispatch({
                  type: AUTHENTICATED_FAIL
              });
          }
      } catch (err) {
        // console.log(err)
          dispatch({
              type: AUTHENTICATED_FAIL
          });
      }

  } else {
      dispatch({
          type: AUTHENTICATED_FAIL
      });
  }
};

export const login = (email, password) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email , password});
  //  console.log('Request Body:', body);
  //  console.log("body type:",typeof body)

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
    // console.log("res"+res)

    dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    });

    dispatch(load_user());
} catch (err) {
    dispatch({
        type: LOGIN_FAIL
    })
} 
};

export const signup = (first_name , last_name, email, password, re_password) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ first_name , last_name ,email  , password, re_password });
  // console.log('body',body)
  // console.log('config',config)

  try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
      // console.log("res:",res)
      //  await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
      

      dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
      });
  } catch (err) {
    // console.log(err.response)
      dispatch({
          type: SIGNUP_FAIL
      })
  }
};

export const verify = (uid, token) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ uid, token });

  try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
      //  console.log("res"+res)

      dispatch({
          type: ACTIVATION_SUCCESS,
      });
  } catch (err) {
      dispatch({
          type: ACTIVATION_FAIL
      })
  }
};

export const reset_password = (email) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ email });

  try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

      dispatch({
          type: PASSWORD_RESET_SUCCESS
      });
  } catch (err) {
      dispatch({
          type: PASSWORD_RESET_FAIL
      });
  }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

      dispatch({
          type: PASSWORD_RESET_CONFIRM_SUCCESS
      });
  } catch (err) {
      dispatch({
          type: PASSWORD_RESET_CONFIRM_FAIL
      });
  }
};

export const logout = () => dispatch => {
  dispatch({
      type: LOGOUT
  });
};

export const setPersonType = (persontype) => dispatch =>{
  dispatch({
    type: SET_PERSON_TYPE,
    payload: persontype,
  });
};

// Action to fetch client ID
export const fetchClientID = (userID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/${userID}/user/`, config);
    // console.log("userID"+userID);
    // console.log(res.JSON.stringify);
    dispatch({
      type: ID_CLIENT_SUCCESS,
      payload: res.data.id,
    });
  } catch (err) {
    console.log(err);
    // Handle error
  }
}
};

// Action to fetch vendor ID
export const fetchVendorID = (clientID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/vendor/${clientID}/client/`, config);
    // console.log("client ID"+clientID);
    // console.log(res.JSON.stringify);
    dispatch({
      type: ID_VENDOR_SUCCESS,
      payload: res.data.id,
    });
  } catch (err) {
    // console.log(err);
    // console.log(err.request.statusText);
    // Handle error
    dispatch({
      type: ID_VENDOR_FAIL,
    });
  }
}
};
