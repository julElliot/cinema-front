import React from 'react';
import SeatInfoBox from './SeatInfoBox';

const DisplayChosenSeats = props => (
  <div className="seat-info-list__container">
    {props.chosenSeats.map(item => (
      <SeatInfoBox key={item._id} seatInfo={item} price={props.sessionSeatTypes[item.type]} />
    ))}
  </div>
);

export default DisplayChosenSeats;
