import React from 'react';
/* import { Link } from 'react-router-dom'
import { links } from '../../config/links';
import OrderTable from './OrdersTable';
import AccountSettings from './AccountSettings' */

const ProfilePageContent = props => (
  <div className="col-md-9">
    <div className="profile-page__content">
      {/*  <OrderTable /> */}
      {/*    <AccountSettings /> */}
      {props.children}
    </div>
  </div>
);

export default ProfilePageContent;
