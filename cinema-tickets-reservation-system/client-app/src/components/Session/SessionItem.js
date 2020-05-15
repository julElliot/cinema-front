import React from 'react';
import { Link } from 'react-router-dom';
import { linkGenerator } from '../../config/links';
import searchFilmActionHelpers from '../../helper/SearchFilmActionHelpers';

const SessionItem = (props) => {
  const { session } = props;
  const time = searchFilmActionHelpers.getTimeFromDate(session.date);
  const date = searchFilmActionHelpers.getFormatedDate(session.date);
  return (
    <div className="session__item ">
      <div className="session__item_time">
        <span>{time}</span>
        <span>{date}</span>
      </div>
      <div className="session__item_text">
        <span>{session.cinema.cinemaName}</span>
        <span>{session.cinema.location}</span>
      </div>
      <Link to={linkGenerator.getSessionPageLink(props.id)} className="session__item__button" role="button">
          Book
      </Link>
    </div>
  );
};

export default SessionItem;
