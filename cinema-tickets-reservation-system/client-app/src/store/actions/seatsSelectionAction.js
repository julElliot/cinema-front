import { toastr } from 'react-redux-toastr';
import { seatsSelectionTypes } from './types';
import sessionServices from '../../services/sessionServices';
import reservationHelpers from '../../helper/ReservationHelpers';
import { history } from '../index';
import { links } from '../../config/links';

const showErrorToast = (err) => {
  const message = err.response && err.response.data.error ? err.response.data.error.message : `${err}`;
  toastr.error(message);
};

export const getSessionById = id => async (dispatch) => {
  try {
    const { data } = await sessionServices.getSessionById(id);
    if (data.isSuccessfully) {
      data.session.sessionSeats = reservationHelpers.modifiedSessionSeats(data.session.sessionSeats);
      dispatch({
        type: seatsSelectionTypes.GET_SESSION_BY_ID,
        payload: {
          session: data.session,
        },
      });
    }
  } catch (err) {
    console.log(err);
    showErrorToast(err);
    history.push(links.FILM_SEARCH_PAGE);
  }
};

/* export const bookSelectedSeats = (sessionId, sessionSeats) => async(dispatch) => {
  try {
    let {data} = await reservationServices.bookSessionSeats(sessionId, sessionSeats);
    if (data.isSuccessfully) {
       dispatch({
        type: orderTypes.FETCH_ORDERS,
        payload: { orderList: data.orderList }
      });
    }
  } catch (err) {
    console.log(err);
    showErrorToast(err);
    history.push(links.FILM_SEARCH_PAGE);
  }
} */
