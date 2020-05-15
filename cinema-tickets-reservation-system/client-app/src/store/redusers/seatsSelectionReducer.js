import { seatsSelectionTypes } from '../actions/types';

const initialState = {};

export const seatsSelectionReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
  case seatsSelectionTypes.GET_SESSION_BY_ID: {
    return {
      ...state,
      session: data.session,
    };
  }
  default:
    return state;
  }
};
