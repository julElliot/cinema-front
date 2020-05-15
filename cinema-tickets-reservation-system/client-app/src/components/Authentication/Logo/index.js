import React from 'react';

const Logo = props => (
  <div className="authentication__image">
    <img src={props.src} alt={props.alt} />
  </div>
);

export default Logo;
