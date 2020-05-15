import React from 'react';
import SessionItem from './SessionItem';
import SessionTitle from './SessionTitle';

const SessionInfo = (props) => {
  const { sessions } = props;
  return (
    <section>
      <div className="session__container">
        <SessionTitle title="Sessions" />
        <div className="session__items">
          {sessions
              // eslint-disable-next-line no-underscore-dangle
              && Object.values(sessions).map(item => <SessionItem session={item} key={item._id} id={item._id} />)}
        </div>
      </div>
    </section>
  );
};

export default SessionInfo;
