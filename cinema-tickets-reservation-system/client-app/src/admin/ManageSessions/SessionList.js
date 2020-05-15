import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SessionItem from './SessionItem';
import { links } from '../../config/links';
import socket from '../../constants/socket';

class SessionInfoContainer extends Component {
  componentDidMount() {
    this.props.fetchSessions();
    socket.off('sessions updated');
    socket.on('sessions updated', () => {
      this.props.fetchSessions();
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 ">
          <div className="row film-tab__button-create">
            <Link to={links.ADD_SESSION} className="film-tab__button">Add Session</Link>
          </div>
          <div className="row">
            <div className="admin-session__items">
              {this.props.sessionList
                && Object.values(this.props.sessionList).map(
                  item => (
                    <SessionItem
                      removeItem={this.props.removeItem}
                      updateItem={this.props.updateItem}
                      session={item}
                      key={item._id}
                      id={item._id}
                    />
                  ),
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionInfoContainer;
