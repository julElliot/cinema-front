import React from 'react';

const SeatBox = (props) => {
  const getSeatBoxClass = (seatInfo) => {
    if (seatInfo.booked) {
      return 'booked';
    }
    if (seatInfo.chosen) {
      return `${seatInfo.type}-chosen`;
    }
    return seatInfo.type;
  };

  return (
    <div className={`seat-${getSeatBoxClass(props.seatInfo)}`} onClick={() => props.callBackFromParent(props.seatInfo)}>
      {props.seatInfo.column + 1}
    </div>
  );
};

export default SeatBox;
