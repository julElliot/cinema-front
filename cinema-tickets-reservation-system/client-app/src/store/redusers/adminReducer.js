import { adminTypes } from '../actions/types';

const initialState = {
};

export const adminReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
  case adminTypes.RESET_FILM_INFO: {
    return initialState;
  }
  case adminTypes.FETCH_FILM_BY_ID: {
    return {
      ...state,
      film: data.film,
    };
  }
  case adminTypes.RESET_SESSION_INFO: {
    return initialState;
  }
  case adminTypes.FETCH_SESSION_BY_ID: {
    return {
      ...state,
      session: data.session,
    };
  }
  case adminTypes.FETCH_SESSION: {
    return {
      ...state,
      sessions: data.sessions,
      allFilmList: data.allFilmList,
      allCinemaList: data.allCinemaList,
    };
  }
  default:
    return state;
  }
};
