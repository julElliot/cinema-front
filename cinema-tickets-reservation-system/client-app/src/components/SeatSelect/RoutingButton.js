import React from 'react';
import { Link } from 'react-router-dom';
import { linkGenerator } from '../../config/links';

const RoutingButton = (props) => {
  const getLinkClass = (chosenSeats) => {
    if (chosenSeats.length === 0) {
      return 'link-disabled';
    }
    return '';
  };

  const getPathForLink = (isSeatsChosen, link) => {
    if (isSeatsChosen) {
      if (link === 'next') {
        return linkGenerator.getSessionPageLink(props.sessionId);
      }
      return linkGenerator.getSessionPageLink(props.sessionId);
    }
    if (link === 'next') {
      return linkGenerator.getSessionPageLink(props.sessionId);
    }
    return linkGenerator.getFilmPageLink(props.filmId);
  };

  return (
    <div className="sites-select__button-container ">
      <Link
        to={getPathForLink(props.isSeatsChosen, 'back')}
        onClick={props.callBackHandleCancel}
        role="button"
        className="film-page__button"
      >
        Back
      </Link>
      <Link
        to={getPathForLink(props.isSeatsChosen, 'next')}
        onClick={props.callBackHandleConfirmation}
        role="button"
        className={`film-page__button ${getLinkClass(props.chosenSeats)}`}
      >
        Next
      </Link>
    </div>
  );
};

export default RoutingButton;
