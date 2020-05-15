import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';
import BurgerButton from './BurgerButton';
import { links } from '../../config/links';
import './nav-menu.scss';
import './header.scss';

const Header = (props) => {
  const { loggedIn, role } = props;
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-dark fixed-top text-uppercase">
        <div className="container">
          {loggedIn && (
            <NavLink className="navbar-brand header__link_yellow" to={links.FILM_SEARCH_PAGE}>
                Films
            </NavLink>
          )}
          <BurgerButton />
          <NavBar loggedIn={loggedIn} role={role} />
        </div>
      </nav>
    </div>
  );
};

export default Header;
