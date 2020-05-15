import React from 'react';
import { Link } from 'react-router-dom';
import { links } from '../../config/links';
import { checkPropTypes } from 'prop-types';

const ProfilePageNavBar = ({ userInfo, handlePageClick }) => {
  const currentHref = window.location.href.replace('http://localhost:3000', '');
  return (
    <div className="col-md-3">
      <div className="profile-page__sidebar">
        <div className="profile-page__usertitle">
          <div className="profile-page__usertitle-name">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
          <div className="profile-page__usertitle-username">{userInfo.email}</div>
        </div>
        <div className="profile-page__menu">
          <ul className="navbar-nav profile-page__nav">
            <li className={`${currentHref === links.ORDERS_PAGE && 'active'} nav-item`}>
              <Link to={links.ORDERS_PAGE} onClick={() => handlePageClick(1, 'current')} className="link nav-link">
                <i className="glyphicon glyphicon-home" />
                Current orders
              </Link>
            </li>
            <li className={`${currentHref === links.PREVIOUS_ORDERS_PAGE && 'active'} nav-item`}>
              <Link to={links.PREVIOUS_ORDERS_PAGE} onClick={() => handlePageClick(1, 'previous')} className="link nav-link">
                <i className="glyphicon glyphicon-ok" />
                Previous orders
              </Link>
            </li>
            <li className={`${currentHref === links.PROFILE_PAGE && 'active'} nav-item`}>
              <Link to={links.PROFILE_PAGE} className="link nav-link">
                <i className="glyphicon glyphicon-user" />
                Account Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageNavBar;
