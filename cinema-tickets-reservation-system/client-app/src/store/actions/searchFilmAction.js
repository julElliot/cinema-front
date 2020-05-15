import { toastr } from 'react-redux-toastr';
import { searchTypes, userTypes, adminTypes } from './types';
import sessionServices from '../../services/sessionServices';
import searchFilmActionHelpers from '../../helper/SearchFilmActionHelpers';

const showErrorToast = (err) => {
  const message = err.response && err.response.data.error ? err.response.data.error.message : `${err}`;
  toastr.error(message);
};

export const setCurrentCity = city => ({
  type: searchTypes.SET_CURRENT_CITY,
  payload: { selectedCity: city },
});

export const setCurrentFilmName = filmName => ({
  type: searchTypes.SET_CURRENT_FILM_NAME,
  payload: { filmName },
});

export const setCurrentCinema = cinema => ({
  type: searchTypes.SET_CURRENT_CINEMA,
  payload: { cinema },
});

export const setSessionDate = date => ({
  type: searchTypes.SET_SESSION_DATE,
  payload: { sesionDate: date },
});

export const setCountOfSeats = countOfSeats => ({
  type: searchTypes.SET_COUNT_OF_SEATS,
  payload: { countOfSeats },
});

export const fetchFilms = () => async (dispatch) => {
  try {
    const { data } = await sessionServices.getSessionList();
    if (data.isSuccessfully) {
      const { filmList, cinemaList, cityList } = searchFilmActionHelpers.getFilmSearchLists(data.sessions);
    //  const {allFilmList, allCinemaList} = searchFilmActionHelpers.getAllFilmList(data.sessions);
   /*    filmList.forEach(film => {
        searchFilmActionHelpers.getPhoto(film);
      }); */
      dispatch({
        type: searchTypes.FETCH_FILMS,
        payload: {
          films: data.sessions,
          filmList,
          cinemaList,
          cityList,
   /*        allFilmList,
          allCinemaList */
        },
      });
      dispatch({
        type: adminTypes.RESET_FILM_INFO,
      }); 
    } else {
      showErrorToast(data.message);
      dispatch({
        type: userTypes.LOGOUT_USER,
      });
    }
  } catch (err) {
    console.log(err);
    showErrorToast(err);
    dispatch({
      type: userTypes.LOGOUT_USER,
    });
  }
};

export const setChosenFilm = id => ({
  type: searchTypes.SET_CHOSEN_FILM_ID,
  payload: { chosenFilm: id },
});
