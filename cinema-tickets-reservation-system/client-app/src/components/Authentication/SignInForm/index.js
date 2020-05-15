import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../Input';
import '../styles/login.scss';
import Header from '../Header';
import { userActions } from '../../../store/actions/userAction';


class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.props.logout();
  }

  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    this.props.resetErrorMessage();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.trim(),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="authentication__form-wrapper">
        <Header header="Sign In Form" />
        <form onSubmit={this.handleSubmit} className="authentication__form-content">
          <p className="help__block">{this.props.errorMessage}</p>
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
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            required
            minLength={6}
            maxLength={20}
            value={password}
          />
          <button className="authentication__form-button" type="submit">Sign In</button>
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
  login: data => dispatch(userActions.login(data)),
  logout: () => dispatch(userActions.logout()),
  resetErrorMessage: () => dispatch(userActions.resetErrorMessage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInForm);
