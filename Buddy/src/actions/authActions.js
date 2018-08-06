import {
  LOGIN_USER,
  LOGOUT_USER,
} from './types';

export const loginUser = () => {
  return (dispatch, getState) => {
    // Do authentication stuff here
    // loginUserSuccess(dispatch)
  }
};

const loginUserSuccess = dispatch => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: true,
  });
};
