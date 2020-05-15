import React, { Fragment } from 'react';

import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  const { loggedIn, role } = props;
  return (
    <Fragment>
      <Header loggedIn={loggedIn} role={role} />
      <div className="content">{props.children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
