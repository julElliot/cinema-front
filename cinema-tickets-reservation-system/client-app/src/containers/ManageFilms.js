/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CreateFilmContainer from './CreateFilmContainer';
import FilmList from '../admin/ManageFilms/FilmList';
import ShowContent from '../admin/ShowContent';
import Header from '../components/Authentication/Header';
import { fetchFilms } from '../store/actions/searchFilmAction';
import {
  removeItem, updateItem, addFilmInfo, startEditingItem,
} from '../store/actions/adminActions';
import { links } from '../config/links';
import '../components/Session/session.scss';


const ManageFilms = (props) => {
  const {
    films, removeItem, updateItem, addFilmInfo, fetchFilms, startEditingItem,
  } = props;
  return (
    <section className="page-content">
      <div className="container">
        <Header header="Film" />
        <ShowContent>
          <Route
            exact
            path={links.MANAGE_MOVIES}
            render={props => (
              <FilmList
                {...props}
                filmList={films}
                removeItem={removeItem}
                fetchFilms={fetchFilms}
                startEditingItem={startEditingItem}
              />
            )}
          />
          <Route
            exact
            path={links.ADD_FILM}
            render={props => (
              <CreateFilmContainer
                {...props}
                addFilmInfo={addFilmInfo}
              />
            )}

          />
          <Route
            exact
            path={links.UPDATE_FILM}
            render={props => (
              <CreateFilmContainer
                {...props}
                updateFilm={updateItem}
                isEditable
              />
            )}
          />
        </ShowContent>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  films: state.search.films,
});

const mapDispatchToProps = dispatch => ({
  fetchFilms: () => dispatch(fetchFilms()),
  removeItem: id => dispatch(removeItem(id)),
  updateItem: (id, data, previousPhoto) => dispatch(updateItem(id, data, previousPhoto)),
  addFilmInfo: data => dispatch(addFilmInfo(data)),
  startEditingItem: id => dispatch(startEditingItem(id)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageFilms);
