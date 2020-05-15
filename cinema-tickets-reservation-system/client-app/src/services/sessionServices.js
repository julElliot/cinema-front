import axios from 'axios';

function addToken() {
  const token = JSON.parse(localStorage.getItem('token')) || null;
  return {
    headers: {
      Authorization: token,
    },
  };
}

function getSessionList() {
  const options = addToken();
  return axios.get('http://localhost:8080/api/films', options, { withCredentials: true });
}

function getFilmById(id) {
  const options = addToken();
  return axios.get(`http://localhost:8080/api/films/${id}`, options, { withCredentials: true });
}

function getSessionById(id) {
  const options = addToken();
  return axios.get(`http://localhost:8080/api/sessions/${id}`, options, { withCredentials: true });
}

export default {
  getSessionList,
  getFilmById,
  getSessionById,
};
