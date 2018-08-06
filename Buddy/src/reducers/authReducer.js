import {
  LOGIN_USER,
  LOGOUT_USER,
} from './types';

const INITIAL_STATE = {
  loggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};
