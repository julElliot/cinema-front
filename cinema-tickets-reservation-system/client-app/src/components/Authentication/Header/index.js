import React from 'react';
import '../styles/login.scss';

const Header = props => <h3 className={`authentication__header ${props.className}`}>{props.header}</h3>;

export default Header;
