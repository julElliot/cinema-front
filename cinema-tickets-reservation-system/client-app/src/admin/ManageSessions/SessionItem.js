import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../images/default-movie-poster.jpg';
import Tool from '../../shared/Tool/Tool';
import { links, linkGenerator } from '../../config/links';

import searchFilmActionHelpers from '../../helper/SearchFilmActionHelpers';
import '../ManageFilms/filmTab.scss';
import './sessionTab.scss';

const SessionInfo = (props) => {
  const { session } = props;
  const time = searchFilmActionHelpers.getTimeFromDate(session.date);
  const date = searchFilmActionHelpers.getFormatedDate(session.date);
  return (
    <div className="col-md-4 col-lg-3">
      <div className="uploader__aside-container">
        <Tool
          src="/images/delete.png"
          className="uploader__aside-container-delete"
          handleClick={() => props.removeItem(props.id)}
        />
        {
          <Link to={linkGenerator.getSessionLink(props.id)}>
            <Tool
              src="/images/edit.png"
              className="uploader__aside-container-update"
            />
          </Link> }

        {/* <div
            className="film-info__container"
            style={{ backgroundImage: `url(${props.film.poster_path || defaultImage})` }}
          >
            <p className="film-info__caption">{props.film.filmName}</p>
          </div> */}

        <div className="admin-session__item">
          <div className="admin-session__item_time">
            <span>Time: {time}</span>
            <span>Day: {date}</span>
          </div>
          <div className="admin-session__item_text">
            <span>Film name: {props.session.film && props.session.film.film_info.filmName}</span>
            <span>Cinema: {props.session.cinema && props.session.cinema.cinemaName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SessionInfo;
