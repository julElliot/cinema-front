import React from 'react';
import SeatsScheme from './SeatsScheme';

const DisplaySeatsScheme = props => (
  <div className="seats-scheme__container">
    <SeatsScheme seatsArray={props.seats} callBackFromParent={props.callBackHandleSeatClick} />
    {props.chosenSeats.length === 5 ? <div>You have chosen maximum count of seats.</div> : ''}
  </div>
);

export default DisplaySeatsScheme;
