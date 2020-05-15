import axios from 'axios';

function addToken() {
  const token = JSON.parse(localStorage.getItem('token')) || null;
  return {
    headers: {
      Authorization: token,
    },
  };
}

function addFilm(filmInfo) {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.post('http://localhost:8080/api/films', { ...filmInfo }, options);
}

function saveImages(formData) {
  console.log('formData', formData);
  return axios.post('http://localhost:8080/api/images', formData);
}

function removeImages(img) {
  console.log('formData', img);
  return axios.delete(img);
}

function removeFilm(id) {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.delete(`http://localhost:8080/api/films/${id}`, options);
}

function updateFilm(id, data) {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.put(`http://localhost:8080/api/films/${id}`, { ...data }, options);
}

function getFilm(id) {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.get(`http://localhost:8080/api/films/${id}`, options);
}

function addSession(sessionInfo) {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.post('http://localhost:8080/api/sessions', { ...sessionInfo }, options);
}

function removeSession(id) {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.delete(`http://localhost:8080/api/sessions/${id}`, options);
}

function updateSession(id, data) {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.put(`http://localhost:8080/api/sessions/${id}`, { ...data }, options);
}

function getSession(id) {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.get(`http://localhost:8080/api/sessions/${id}`, options);
}

function getAllSessions() {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.get('http://localhost:8080/api/sessions', options);
}

export default {
  addFilm,
  saveImages,
  removeFilm,
  updateFilm,
  getFilm,
  addSession,
  removeSession,
  updateSession,
  getSession,
  getAllSessions,
  removeImages,
};
