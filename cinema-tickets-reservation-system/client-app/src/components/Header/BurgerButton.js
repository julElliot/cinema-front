import React from 'react';

const BurgerButton = () => (
  <button
    className="navbar-toggler collapsed"
    type="button"
    data-toggle="collapse"
    data-target="#navbarResponsive"
    aria-controls="navbarResponsive"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-dark navbar-toggler-icon" />
  </button>
);

export default BurgerButton;
