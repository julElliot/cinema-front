import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { userTypes } from './types';
import userServices from '../../services/authServices';
import { links } from '../../config/links';
import { history } from '../index';

const showErrorToast = (err) => {
  const message = err.response && err.response.data.error ? err.response.data.error.message : `${err}`;
  toastr.error(message);
};

function setUserLocation(city) {
  return {
    type: userTypes.SET_LOCATION,
    payload: {
      userLocation: city,
    },
  };
}

function resetErrorMessage() {
  return {
    type: userTypes.RESET_ERROR_MESSAGE,
  };
}

function login(values) {
  return async (dispatch) => {
    try {
      const { data } = await userServices.login(values);
      if (data.isSuccessfully) {
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: {
            user: data.user,
            token: data.token,
          },
        });
        dispatch(setUserLocation(data.user.location));
        axios.defaults.headers.common.Authorization = data.token.token;
        localStorage.setItem('token', JSON.stringify(data.token.token));
        history.push(links.FILM_SEARCH_PAGE);
      } else {
        dispatch({
          type: userTypes.SIGN_IN_FAILD,
          payload: {
            message: data.message,
          },
        });
      }
    } catch (err) {
      showErrorToast(err);
    }
  };
}

function signup(userInfo) {
  return async (dispatch) => {
    try {
      const { data } = await userServices.signup(userInfo);
      if (data.isSuccessfully) {
        dispatch(
          login({
            email: userInfo.email,
            password: userInfo.password,
          }),
        );
      } else {
        dispatch({
          type: userTypes.SIGN_UP_FAILD,
          payload: {
            message: data.message,
          },
        });
      }
    } catch (err) {
      console.log(err);
      showErrorToast(err);
    }
  };
}

function logout() {
  return async (dispatch) => {
    try {
      await userServices.logout();
      delete axios.defaults.headers.common.Authorization;
      dispatch({ type: userTypes.LOGOUT_USER });
    } catch (err) {
      showErrorToast(err);
    }
  };
}

export const userActions = {
  setUserLocation,
  resetErrorMessage,
  login,
  logout,
  signup,
};
