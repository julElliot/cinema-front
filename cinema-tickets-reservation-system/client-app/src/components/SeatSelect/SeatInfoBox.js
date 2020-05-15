import React from 'react';

const ChosenSeatInfoBox = props => (
  <div className="seat-info__box">
    <div>
      Row {props.seatInfo.row + 1} / Seat {props.seatInfo.column + 1}
    </div>
    <div>Type : {props.seatInfo.type}</div>
    <div>Price : {props.price}</div>
  </div>
);
export default ChosenSeatInfoBox;
