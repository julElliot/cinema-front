import React from 'react';
import './orderTable.scss';

const OrderItem = props => (
  <tr className="order__table-row ">
    <td className="order-table__cell-filmName">{props.filmName}</td>
    <td>{props.city}</td>
    <td>{props.cinema}</td>
    <td>{props.date}</td>
    <td>{props.time}</td>
    <td>{props.countOfTickets}</td>
    <td>{props.price}</td>
  </tr>
);

export default OrderItem;
