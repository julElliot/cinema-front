import React, { Component } from 'react';
import '../components/Films/film.scss';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import FilmList from '../components/Films/FilmList';
import SearchBar from '../components/Films/SearchBar';
import Header from '../components/Authentication/Header';
import { getFiltredFilms } from '../store/selectors';
import {
  fetchFilms,
  setCurrentCity,
  setCurrentFilmName,
  setCurrentCinema,
  setSessionDate,
  setCountOfSeats,
} from '../store/actions/searchFilmAction';

class FilmSearchPage extends Component {
  componentDidMount() {
    this.props.fetchFilms();
    // this.props.setCurrentCity(this.props.userLocation);
    this.props.setSessionDate(new Date());
    this.props.setCountOfSeats(1);
  }

  setCurrentFilmName = (filmName) => {
    this.props.setCurrentFilmName(filmName);
  };

  setCurrentCity = (city) => {
    this.props.setCurrentCity(city);
  };

  setCurrentCinema = (cinema) => {
    this.props.setCurrentCinema(cinema);
  };

  setSessionDate = (date) => {
    this.props.setSessionDate(date);
  };

  render() {
    const {
      filtredFilms, selectedCity, filmName, cinema, sessionDate, filmList, cinemaList, cityList,
    } = this.props;
    return (
      <section className="page-content">
        <div className="container">
          <Header header="Film Search" />
          <SearchBar
            cities={cityList}
            selectedCity={selectedCity}
            filmName={filmName}
            cinema={cinema}
            sessionDate={sessionDate}
            onFilmNameChange={this.setCurrentFilmName}
            onCityChange={this.setCurrentCity}
            onCinemaChange={this.setCurrentCinema}
            setSessionDate={this.setSessionDate}
            onButtonClick={this.onButtonClick}
            filmList={filmList}
            cinemaList={cinemaList}
          />
          {!filtredFilms
            ? (
              <div className="loadingBlock">
                <Loader
                  type="Puff"
                  color="#ffc107c9"
                  height="100"
                  width="100"
                  className="loader"
                />
              </div>
            )
            : <FilmList filmList={filtredFilms} />
          }
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  films: state.search.films,
  filtredFilms: getFiltredFilms(state.search),
  selectedCity: state.search.filters.selectedCity,
  filmName: state.search.filters.filmName,
  cinema: state.search.filters.cinema,
  sessionDate: state.search.filters.sessionDate,
  userLocation: state.user.userLocation,
  filmList: state.search.filmList,
  cinemaList: state.search.cinemaList,
  cityList: state.search.cityList,
});

const mapDispatchToProps = dispatch => ({
  fetchFilms: () => dispatch(fetchFilms()),
  setCurrentFilmName: filmName => dispatch(setCurrentFilmName(filmName)),
  setCurrentCity: city => dispatch(setCurrentCity(city)),
  setCurrentCinema: cinema => dispatch(setCurrentCinema(cinema)),
  setSessionDate: date => dispatch(setSessionDate(date)),
  setCountOfSeats: count => dispatch(setCountOfSeats(count)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilmSearchPage);
