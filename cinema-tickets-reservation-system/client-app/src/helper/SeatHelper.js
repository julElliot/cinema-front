class SeatHelper {
  getSeatsRowsNumber = seats => seats[seats.length - 1].row + 1;

  sortSeats = seats => seats.sort((a, b) => {
    if (a.row === b.row) {
      if (a.column > b.column) {
        return 1;
      }
      if (a.column < b.column) {
        return -1;
      }
      return 0;
    }
    if (a.row > b.row) {
      return 1;
    }
    return -1;
  });

  convertSeatsArray = (seats, rows) => {
    const seatsArray = [];
    let j = 0;
    for (let i = 0; i < rows; i++) {
      seatsArray[i] = [];
      const currentRow = i;
      while (j < seats.length && seats[j].row === currentRow) {
        seatsArray[i].push(seats[j++]);
      }
    }
    return seatsArray;
  };
}

const seatHelper = new SeatHelper();

export default seatHelper;
