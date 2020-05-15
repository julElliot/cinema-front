import axios from 'axios';

function addToken() {
  const token = JSON.parse(localStorage.getItem('token')) || null;
  return {
    headers: {
      Authorization: token,
    },
  };
}

function updateSeat(sessionId, seatInfo) {
  const options = addToken();
  // eslint-disable-next-line no-underscore-dangle
  return axios.put(`http://localhost:8080/api/sessions/${sessionId}/seats/${seatInfo._id}`, seatInfo, options, {
    withCredentials: true,
  });
}

function bookSessionSeats(sessionId, sessionSeats) {
  const options = addToken();
  return axios.put(`http://localhost:8080/api/sessions/${sessionId}/seats`, sessionSeats, options, {
    withCredentials: true,
  });
}

function removeBooking(sessionId, sessionSeats) {
  const options = addToken();
  return axios.put(`http://localhost:8080/api/sessions/${sessionId}/seats/removeBooking`, sessionSeats, options, {
    withCredentials: true,
  });
}

export default {
  updateSeat,
  bookSessionSeats,
  removeBooking,
};
