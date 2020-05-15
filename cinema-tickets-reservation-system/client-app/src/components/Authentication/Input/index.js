import React from 'react';
import '../styles/login.scss';

const Input = props => (
  <div className="form-group authentication__form-group">
    <input
      type={props.type}
      name={props.name}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
      placeholder={props.placeholder}
      className={`form-control authentication__form-control ${props.input_half_size}`}
      onChange={props.onChange}
      value={props.value}
    />
    <i className="" />
    {props.caption && <div className="help__block">{props.caption}</div>}
  </div>
);

Input.defaultProps = {
  minLength: 1,
  maxLength: 20,
  required: true,
  value: '',
};

export default Input;
