import React, { Fragment } from 'react';
import SeatBox from './SeatBox';

const SeatsScheme = props => (
  <Fragment>
    <div className="scheme__container">
      {props.seatsArray.map(item => (
        <div className="row scheme__row" key={item[0].row}>
          <div className="row__number">
            <span> {item[0].row + 1} </span>
          </div>
          <div className=" row__seats" key={item[0].row}>
            {item.map(itemArray => (
              <SeatBox
                key={itemArray._id}
                seatInfo={itemArray}
                callBackFromParent={props.callBackFromParent}
              />
            ))}
          </div>
          <div className="row__number">
            <span> {item[0].row + 1} </span>
          </div>
        </div>
      ))}
    </div>
  </Fragment>
);

export default SeatsScheme;
