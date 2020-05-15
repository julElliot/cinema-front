import React, { Component } from 'react';
import Header from '../components/Authentication/Header';

import '../components/Session/session.scss';

class ManageCinemas extends Component {
  state = {
    count: 1,
  }

  render() {
    return (
      <section className="page-content">
        <div className="container">
          <Header header="Cinema" />
        </div>
      </section>
    );
  }
}


export default ManageCinemas;
