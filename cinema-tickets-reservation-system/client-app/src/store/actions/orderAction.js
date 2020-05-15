import { toastr } from 'react-redux-toastr';
import { orderTypes } from './types';
import orderActionHelpers from '../../helper/OrderActionHelpers';
import orderServices from '../../services/orderServices';
import { history } from '../index';
import { links } from '../../config/links';

const showErrorToast = (err) => {
  const message = err.response && err.response.data.error ? err.response.data.error.message : `${err}`;
  toastr.error(message);
};

export const addOrder = (session, chosenSeats, chosenExtraServices) => async () => {
  const info = orderActionHelpers.formOrder(session, chosenSeats, chosenExtraServices);
  try {
    const { data } = await orderServices.addOrder(info);
    if (data.isSuccessfully) {
      history.push(links.ORDERS_PAGE);
    }
  } catch (err) {
    console.log(err);
    showErrorToast(err);
  }
};

export const fetchOrders = (page, typeOfOrders) => async (dispatch) => {
  try {
    const { data } = await orderServices.getOrderList(page, typeOfOrders);
    if (data.isSuccessfully) {
      dispatch({
        type: orderTypes.FETCH_ORDERS,
        payload: {
          orderList: data.orderList,
          pageSize: data.pageSize,
          dataCount: data.totalAmount,
          requestPage: data.pageNumber,
        },
      });
    }
  } catch (err) {
    console.log(err);
    showErrorToast(err);
    history.push(links.SIGN_IN_PAGE);
  }
};
