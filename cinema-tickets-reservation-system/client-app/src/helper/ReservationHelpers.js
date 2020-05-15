const _ = require('lodash');

class ReservationHelpers {
  countTotalPrice = (chosenSeats, chosenExtraServices, sessionSeatTypes, extraServices) => {
    const priceOfTickets = chosenSeats.reduce((sum, current) => sum + sessionSeatTypes[current.type], 0);

    const priceOfExtraServices = Object.keys(chosenExtraServices).reduce(
      (sum, current) => sum + chosenExtraServices[current] * extraServices[current],
      0,
    );
    const totalPrice = priceOfTickets + priceOfExtraServices;
    return { priceOfTickets, priceOfExtraServices, totalPrice };
  };

  modifiedSessionSeats = sessionSeats => _.map(sessionSeats, (sessionSeat) => {
    sessionSeat.row = sessionSeat.seat_id.row;
    sessionSeat.column = sessionSeat.seat_id.column;
    sessionSeat.type = sessionSeat.seat_id.type;
    return sessionSeat;
  });
}

const reservationHelpers = new ReservationHelpers();

export default reservationHelpers;
