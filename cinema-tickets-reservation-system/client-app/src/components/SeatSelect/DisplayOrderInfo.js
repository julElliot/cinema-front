import React from 'react';
import searchFilmActionHelpers from '../../helper/SearchFilmActionHelpers';

const DisplayOrderInfo = ({ sessionInfo }) => {
  const time = searchFilmActionHelpers.getTimeFromDate(sessionInfo.date);
  const date = searchFilmActionHelpers.getFormatedDate(sessionInfo.date);

  return (
    <div className="order-info__container table-responsive col12 col-md-7">
      <table className="order-info__table table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Cinema</th>
            <th scope="col">City</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody className="order-info__row">
          <tr>
            <td className="order-info__film-name">
              <span>{sessionInfo.film.film_info && sessionInfo.film.film_info.filmName}</span>
            </td>
            <td className="order-info__cinema">
              <span>{sessionInfo.cinema && sessionInfo.cinema.cinemaName}</span>
            </td>
            <td className="order-info__city">
              <span>{sessionInfo.cinema && sessionInfo.cinema.location}</span>
            </td>
            <td className="order-info__date">
              <span>{sessionInfo && date}</span>
            </td>
            <td className="order-info__time">
              <span>{sessionInfo && time}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayOrderInfo;
