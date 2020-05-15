import { orderTypes } from '../actions/types';

const initialState = {
  currentPage: 1,
  nextPage: null,
};

export const orderReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
  case orderTypes.ADD_ORDER: {
    return {
      ...state,
    };
  }
  case orderTypes.FETCH_ORDERS: {
    const {
      pageSize, orderList, dataCount, requestPage,
    } = data;
    const pageCount = (pageSize && orderList && orderList.length)
      ? Math.ceil(dataCount / pageSize)
      : 0;
    const currentPage = (requestPage > pageCount) ? 1 : requestPage;
    const nextPage = (currentPage < pageCount) ? (currentPage + 1) : null;
    return {
      ...state,
      orderList: data.orderList,
      currentPage,
      nextPage,
    };
  }
  default:
    return state;
  }
};
