import React from 'react';
import '../styles/login.scss';
import Option from '../Option';

const Select = props => (
  <div className="form-group authentication__form-group">
    <select
      name={props.name}
      id=""
      className="form-control form-login__select authentication__form-control"
      onChange={props.onChange}
      required={props.required}
      value={props.value}
    >
      {props.options.map(
        item => <Option key={item.id} item={item.name} value={item.value} />,
      )
      }
    </select>
    <i className="" />
    {props.caption
            && <div className="help__block">{props.caption}</div>
    }
  </div>
);

export default Select;
