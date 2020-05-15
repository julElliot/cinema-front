import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from '../components/Authentication/Header';
import AddSessionForm from '../admin/ManageSessions/CreateSession';
import SessionList from '../admin/ManageSessions/SessionList';
import ShowContent from '../admin/ShowContent';
import '../components/Session/session.scss';
import {
  fetchSessions, removeSession, updateSession, fetchSession,
} from '../store/actions/adminActions';
import { links } from '../config/links';


class ManageSessions extends Component {
  render() {
    const {
      sessions, removeItem, updateItem, fetchSession, fetchSessions, filmList, cinemaList,
    } = this.props;
    return (
      <section className="page-content">
        <div className="container">
          <Header header="Session" />
          <ShowContent>
            <Route
              exact
              path={links.MANAGE_SESSIONS}
              render={props => (
                <SessionList
                  {...props}
                  sessionList={sessions}
                  removeItem={removeItem}
                  updateItem={updateItem}
                  fetchSessions={fetchSessions}
                />
              )}
            />
            <Route
              exact
              path={links.ADD_SESSION}
              render={props => (
                <AddSessionForm
                  {...props}
                  filmList={filmList}
                  cinemaList={cinemaList}
                />
              )}
            />
            <Route
              exact
              path={links.UPDATE_SESSION}
              render={props => (
                <AddSessionForm
                  {...props}
                  fetchSession={fetchSession}
                  updateSession={updateItem}
                  isEditable
                />
              )}

            />
          </ShowContent>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  sessions: state.admin.sessions,
  filmList: state.admin.allFilmList,
  cinemaList: state.admin.allCinemaList,
});

const mapDispatchToProps = dispatch => ({
  fetchSessions: () => dispatch(fetchSessions()),
  removeItem: id => dispatch(removeSession(id)),
  updateItem: (id, data) => dispatch(updateSession(id, data)),
  fetchSession: id => dispatch(fetchSession(id)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageSessions);
