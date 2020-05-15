import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Input from '../Input';
import InputGroup from '../Input/InputGroup';
import Select from '../Select';
import '../styles/login.scss';
import options from '../Option/optionData.json';
import { userActions } from '../../../store/actions/userAction';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.props.logout();
  }

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    location: '',
    gender: '',
    errors: {},
  };

  componentDidMount() {
    this.props.resetErrorMessage();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.trim(),
      errors: {},
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      email, password, confirmPassword, firstName, lastName, location, gender,
    } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        errors: {
          password: "Confirm password don't match",
        },
      });
    } else {
      this.props.signUp({
        email, password, firstName, lastName, location, gender,
      });
    }
  };

  render() {
    const {
      email, password, confirmPassword, firstName, lastName, location, gender, errors,
    } = this.state;
    return (
      <div className="authentication__form-wrapper">
        <Header header="Sign Up Form" />
        <form onSubmit={this.handleSubmit} className="authentication__form-content">
          <p className="help__block">{this.props.errorMessage}</p>
          <InputGroup
            onChange={this.handleChange}
            valueFirstName={firstName}
            valueLastName={lastName}
            required
            maxLength={20}
          />
          <Input
            placeholder="Email"
            name="email"
            type="email"
            onChange={this.handleChange}
            required
            maxLength={20}
            value={email}
          />
          <Input
            type="text"
            placeholder="City"
            name="location"
            onChange={this.handleChange}
            required
            maxLength={15}
            value={location}
          />
          <Select options={options} onChange={this.handleChange} name="gender" required value={gender} />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            required
            minLength={6}
            maxLength={20}
            value={password}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={this.handleChange}
            required
            minLength={6}
            maxLength={20}
            value={confirmPassword}
            caption={errors.password}
          />
          <button className="authentication__form-button" type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggingIn: state.user.loggingIn,
    errorMessage: state.user.errorMessage,
  };
}

const mapDispatchToProps = dispatch => ({
  signUp: data => dispatch(userActions.signup(data)),
  logout: () => dispatch(userActions.logout()),
  resetErrorMessage: () => dispatch(userActions.resetErrorMessage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);
