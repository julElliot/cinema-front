import axios from 'axios';

function signup(data) {
  return axios.post('http://localhost:8080/api/signup', data, { withCredentials: true });
}

function login(data) {
  return axios.post('http://localhost:8080/api/login', data, { withCredentials: true });
}

function logout() {
  return axios.get('http://localhost:8080/api/logout', { withCredentials: true });
}

export default {
  signup,
  login,
  logout,
};
