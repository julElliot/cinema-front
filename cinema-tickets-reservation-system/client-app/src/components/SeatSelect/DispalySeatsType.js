import React, { Fragment } from 'react';
import { seatTypesConstants } from '../../constants/seatTypesConstants';

const DisplaySeatsType = props => (
  <div className="seat-types-info__panel">
    <div className="seat-type-info__block">
      <div className="seat-booked" />
      <p>Booked seat</p>
    </div>
    {props.sessionSeatTypes[seatTypesConstants.DEFAULT_SEAT]
      && (
        <Fragment>
          <div className="seat-type-info__block">
            <div className="seat-default" />
            <p>Available default seat</p>
          </div>
          <div className="seat-type-info__block">
            <div className="seat-default-chosen" />
            <p>Chosen default seat</p>
          </div>
        </Fragment>
      )
    }
    {props.sessionSeatTypes[seatTypesConstants.VIP_SEAT]
      && (
        <Fragment>
          <div className="seat-type-info__block">
            <div className="seat-vip" />
            <p>Available vip seat</p>
          </div>
          <div className="seat-type-info__block">
            <div className="seat-vip-chosen" />
            <p>Chosen vip seat</p>
          </div>
        </Fragment>
      )
    }
  </div>
);

export default DisplaySeatsType;
