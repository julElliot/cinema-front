import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.scss';
import { links } from '../../../config/links';

const Button = props => (
  <div>
    <Link to={links.FILM_SEARCH_PAGE} className="authentication__form-button" role="button">
      {props.text}
    </Link>
  </div>
);

export default Button;
