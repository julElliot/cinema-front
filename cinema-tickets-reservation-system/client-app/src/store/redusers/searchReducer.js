import moment from 'moment';
import { searchTypes } from '../actions/types';

const initialState = {
  filters: {
    selectedCity: 'minsk',
    filmName: undefined,
    cinema: undefined,
    sessionDate: moment(),
    countOfSeats: 1,
  },
  films: undefined,
  chosenFilm: undefined,
};

export const searchReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
  case searchTypes.SET_CURRENT_CITY: {
    return {
      ...state,
      filters: {
        ...state.filters,
        selectedCity: data.selectedCity,
      },
    };
  }
  case searchTypes.SET_CURRENT_FILM_NAME: {
    return {
      ...state,
      filters: {
        ...state.filters,
        filmName: data.filmName,
      },
    };
  }
  case searchTypes.SET_CURRENT_CINEMA: {
    return {
      ...state,
      filters: {
        ...state.filters,
        cinema: data.cinema,
      },
    };
  }
  case searchTypes.SET_SESSION_DATE: {
    return {
      ...state,
      filters: {
        ...state.filters,
        sessionDate: data.sesionDate,
      },
    };
  }
  case searchTypes.SET_COUNT_OF_SEATS: {
    return {
      ...state,
      filters: {
        ...state.filters,
        countOfSeats: data.countOfSeats,
      },
    };
  }
  case searchTypes.FETCH_FILMS: {
    return {
      ...state,
      films: data.films,
      filmList: data.filmList,
      cinemaList: data.cinemaList,
      cityList: data.cityList,
/*       allFilmList: data.allFilmList,
      allCinemaList: data.allCinemaList */
    };
  }
  case searchTypes.SET_CHOSEN_FILM_ID: {
    return {
      ...state,
      chosenFilm: data.chosenFilm,
    };
  }
  default:
    return state;
  }
};
