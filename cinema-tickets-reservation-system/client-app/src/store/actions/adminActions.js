import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { adminTypes } from './types';
import { links, linkGenerator } from '../../config/links';
import { history, store } from '../index';
import adminServices from '../../services/adminServices';
import searchFilmActionHelpers from '../../helper/SearchFilmActionHelpers';
import adminActionHelper from '../../helper/AdminActionHelper';


const showErrorToast = (err) => {
  const message = err.response && err.response.data.error ? err.response.data.error.message : `${err}`;
  toastr.error(message);
};

const showSuccessToast = (message) => {
  toastr.success(message);
};


const sendPhoto = async (photo) => {
  const image = photo;
  const formData = new FormData();
  formData.append('FilmPoster', image);
  const {
    data: { imagePath },
  } = await adminServices.saveImages(formData);
  return imagePath;
};

const removePhoto = async (photo) => {
  const { data } = await adminServices.removeImages(photo);
  return data;
};

export const addFilmInfo = film => async (dispatch) => {
  try {
    console.log(film);
    const imagePath = await sendPhoto(film.photo);

    const newFilm = {
      ...film,
      imagePath: imagePath.src,
    };
    console.log(newFilm);
    const response = await adminServices.addFilm(newFilm);

    dispatch({
      type: adminTypes.ADD_FILM,
      payload: {
        film: response.result,
      },
    });
    showSuccessToast('Film created!');
    dispatch({
      type: adminTypes.RESET_FILM_INFO,
    });

    history.push(links.MANAGE_MOVIES);
  } catch (err) {
    showErrorToast(err);
  }
};

export const removeItem = id => async () => {
  try {
    const response = await adminServices.removeFilm(id);
    if (response.data.isSuccessfully) {
      showSuccessToast('Film deleted!');
    }
    history.push(links.MANAGE_MOVIES);
  } catch (err) {
    showErrorToast(err);
  }
};

export const updateItem = (id, film, previousPhoto) => async (dispatch) => {
  try {
    if (film.photo !== previousPhoto) {
      const imagePath = await sendPhoto(film.photo);
      if (adminActionHelper.isRemovable(previousPhoto)) {
        await removePhoto(previousPhoto);
      }
      film.imagePath = imagePath.src;
    } else {
      film.imagePath = film.photo;
    }
    const response = await adminServices.updateFilm(id, film);
    if (response.data.isSuccessfully) {
      showSuccessToast('Film updated!');
    }
    dispatch({
      type: adminTypes.RESET_FILM_INFO,
    });
    history.push(links.MANAGE_MOVIES);
  } catch (err) {
    showErrorToast(err);
  }
};

export const fetchFilm = id => async (dispatch) => {
  try {
    const response = await adminServices.getFilm(id);
    if (response.data.isSuccessfully) {
      dispatch({
        type: adminTypes.FETCH_FILM_BY_ID,
        payload: {
          film: response.data.result,
        },
      });
    }
  } catch (err) {
    showErrorToast(err);
  }
};

export const startEditingItem = id => (dispatch) => {
  dispatch(fetchFilm(id));
  history.push(linkGenerator.getFilmLink(id));
};


export const fetchSessions = () => async (dispatch) => {
  try {
    dispatch({
      type: adminTypes.RESET_FILM_INFO,
    });
    const response = await adminServices.getAllSessions();
    const { allFilmList, allCinemaList } = searchFilmActionHelpers.getAllFilmList(store.getState().search.films);
    if (response.data.isSuccessfully) {
      dispatch({
        type: adminTypes.FETCH_SESSION,
        payload: {
          sessions: response.data.sessions,
          allFilmList,
          allCinemaList,
        },
      });
    }
  } catch (err) {
    showErrorToast(err);
  }
};

export const fetchSession = id => async (dispatch) => {
  try {
    const response = await adminServices.getSession(id);
    if (response.data.isSuccessfully) {
      dispatch({
        type: adminTypes.FETCH_SESSION_BY_ID,
        payload: {
          session: response.data.result,
        },
      });
    }
  } catch (err) {
    showErrorToast(err);
  }
};

export const addSessionInfo = session => async (dispatch) => {
  try {
    console.log('qwerty');
    session.date = moment(moment.now()).add(1, 'day');
    session.session_info = {
      seat_type: {
        vip: 7,
        default: 3,
      },
      extra_services: {
        popcorn: 1,
        cola: 1,
        juice: 3,
        marshmallow: 2,
      },
    };
    const response = await adminServices.addSession(session);
    console.log(response);
    /*     dispatch({
      type: adminTypes.ADD_SESSION,
      payload: {
        session: response.result,
      },
    }); */
    showSuccessToast('Session created!');
    dispatch({
      type: adminTypes.RESET_SESSION_INFO,
    });

    history.push(links.MANAGE_SESSIONS);
  } catch (err) {
    showErrorToast(err);
  }
};

export const removeSession = id => async () => {
  try {
    const response = await adminServices.removeSession(id);
    if (response.data.isSuccessfully) {
      showSuccessToast('Session deleted!');
    }
    history.push(links.MANAGE_SESSIONS);
  } catch (err) {
    showErrorToast(err);
  }
};

export const updateSession = (id, session) => async (dispatch) => {
  try {
    const response = await adminServices.updateSession(id, session);
    if (response.data.isSuccessfully) {
      showSuccessToast('Session updated!');
    }
    dispatch({
      type: adminTypes.RESET_SESSION_INFO,
    });
    history.push(links.MANAGE_SESSIONS);
  } catch (err) {
    showErrorToast(err);
  }
};
