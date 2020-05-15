import React from 'react';
import './orderTable.scss';
import OrderItem from './OrderItem';
import searchFilmActionHelpers from '../../helper/SearchFilmActionHelpers';
import Pagination from '../../shared/Pagination';

const OrderTable = (props) => {
  const { orders } = props;
  return (
    <div className="order__container table-responsive-lg">
      <table className="order-table table  table-hover">
        <thead className="thead-dark order__table-head ">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">Cinema</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Count</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const time = searchFilmActionHelpers.getTimeFromDate(order.date);
            const date = searchFilmActionHelpers.getFormatedDate(order.date);
            return (
              <OrderItem
                key={order._id}
                filmName={order.filmName}
                city={order.location}
                cinema={order.cinema}
                date={date}
                time={time}
                countOfTickets={order.chosenSeats.length}
                price={order.price.totalPrice}
              />
            );
          })}
        </tbody>
      </table>
      {
        orders && orders.length ? (
          <Pagination
            currentPage={props.currentPage}
            nextPage={props.nextPage}
            goToPage={props.handlePageClick}
          />
        ) : (
          <p className="order-not-found">Nothing not foud</p>
        )
      }
    </div>
  );
};

export default OrderTable;
