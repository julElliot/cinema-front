import { userTypes } from '../actions/types';

const initialState = {
  userLocation: 'minsk',
  user: localStorage.getItem('user') || null,
  userInfo: '',
};

export const userReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
  case userTypes.SET_LOCATION: {
    return {
      ...state,
      userLocation: data.userLocation,
    };
  }
  case userTypes.RESET_ERROR_MESSAGE: {
    return {
      ...state,
      errorMessage: '',
    };
  }
  case userTypes.SIGN_IN_SUCCESS: {
    localStorage.setItem('user', data.user.role);
    return {
      ...state,
      userInfo: data.user,
      user: data.user.role,
      isLoggedIn: true,
      errorMessage: undefined,
    };
  }
  case userTypes.SIGN_IN_FAILD: {
    return {
      ...state,
      isLoggedIn: false,
      errorMessage: data.message,
    };
  }
  case userTypes.SIGN_UP_FAILD: {
    return {
      ...state,
      isLoggedIn: false,
      errorMessage: data.message,
    };
  }
  case userTypes.LOGOUT_USER: {
    localStorage.removeItem('user');
    return {
      ...state,
      isLoggedIn: false,
      user: null,
    };
  }
  default:
    return state;
  }
};
