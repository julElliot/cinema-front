import axios from 'axios';

function addToken() {
  const token = JSON.parse(localStorage.getItem('token')) || null;
  return {
    headers: {
      Authorization: token,
    },
  };
}

function getOrderList(page, typeOfOrders) {
  const options = addToken();
  options.params = {
    page,
    typeOfOrders,
  };

  return axios.get('http://localhost:8080/api/orders', options);
}

function addOrder(data) {
  const options = addToken();
  return axios.post('http://localhost:8080/api/orders', data, options, { withCredentials: true });
}

export default {
  getOrderList,
  addOrder,
};
