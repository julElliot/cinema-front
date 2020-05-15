import React from 'react';
import FilmInfo from './FilmInfo';

const FilmInfoContainer = props => (
  <div className="row">
    <div className="col-md-12 ">
      <div className="row">
        {props.filmList
          && Object.values(props.filmList).map(
            item => item.sessions
              && item.sessions.length > 0 && <FilmInfo film={item.film_info} key={item._id} id={item._id} />,
          )}
      </div>
    </div>
  </div>
);

export default FilmInfoContainer;
