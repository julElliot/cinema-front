import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { links } from '../config/links';
import AdminTabBar from './AdminTabBar';

const Admin = () => (
  <Fragment>
    <Route path={links.ADMIN_HOME} component={AdminTabBar} />
  </Fragment>
);

export default Admin;
