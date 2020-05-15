import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { links } from '../config/links';
import FilmCard from '../components/Session/FilmCard';
import SessionInfo from '../components/Session/SessionInfo';
import Header from '../components/Authentication/Header';
import SearchBar from '../components/Session/SearchBar';
import { getChosenFilm } from '../store/selectors';
import { setChosenFilm, setCountOfSeats } from '../store/actions/searchFilmAction';

import '../components/Session/session.scss';
import defaultImage from '../images/default-movie-poster.gif';

class FilmPage extends Component {
  componentDidMount() {
    this.props.setChosenFilm(this.props.match.params.id);
    this.props.setCountOfSeats(1);
  }

  setCountOfSeats = (countOfSeats) => {
    this.props.setCountOfSeats(countOfSeats);
  };

  render() {
    const { film, countOfSeats } = this.props;
    return (
      <section className="page-content">
        <div className="container">
          <Header header="Sessions" />
          <SearchBar countOfSeats={countOfSeats} setCountOfSeats={this.setCountOfSeats} />
          <div className="row film-page__info">
            <div className="col-md-6 film-page__film-info">
              <FilmCard
                title={film.film_info.filmName}
                image={film.film_info.poster_path || defaultImage}
                description={film.film_info.description}
              />
            </div>
            <div className="col-md-6 ">
              <SessionInfo sessions={film.sessions} />
            </div>
          </div>
          <Link to={links.FILM_SEARCH_PAGE} role="button" className="film-page__button button-back">
            Back
          </Link>
        </div>
      </section>
    );
  }
}

FilmPage.defaultProps = {
  film: {
    film_info: {
      filmName: '',
      description: '',
      poster_path: defaultImage,
    },
    sessions: [],
  },
};

const mapStateToProps = state => ({
  film: getChosenFilm(state.search),
  countOfSeats: state.search.filters.countOfSeats,
});

const mapDispatchToProps = dispatch => ({
  setChosenFilm: id => dispatch(setChosenFilm(id)),
  setCountOfSeats: countOfSeats => dispatch(setCountOfSeats(countOfSeats)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilmPage);
