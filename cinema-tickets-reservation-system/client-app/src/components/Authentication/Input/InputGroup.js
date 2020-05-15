import React, { Component } from 'react';
import Input from './index';

class InputGroup extends Component {
  generatePlaceholder = (str, data) => (data ? `${str}: ${data}` : str);

  render() {
    const { userInfo } = this.props;
    return (
      <div className="form-group authentication__input_group">
        <Input
          type="text"
          placeholder={this.generatePlaceholder('First Name', userInfo.firstName)}
          input_half_size="form-login__input-half"
          name="firstName"
          onChange={this.props.onChange}
          required={this.props.required}
          maxLength={this.props.maxLength}
          value={this.props.valueFirstName}
        />
        <Input
          type="text"
          placeholder={this.generatePlaceholder('Last Name', userInfo.lastName)}
          name="lastName"
          input_half_size="form-login__input-half"
          onChange={this.props.onChange}
          required={this.props.required}
          maxLength={this.props.maxLength}
          value={this.props.valueLastName}
        />
      </div>
    );
  }
}

InputGroup.defaultProps = {
  userInfo: {
    firstName: '',
    lastName: '',
  },
};

export default InputGroup;
