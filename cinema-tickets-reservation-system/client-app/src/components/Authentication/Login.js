import React from 'react';
import SignInForm from './SignInForm';
import './styles/login.scss';
import Logo from './Logo';

const Login = () => (
  <section className="page-content authentication__form">
    <div className="container login__form">
      <div className="authentication__content">
        <Logo src="../images/registration-form-2.jpg" alt="sing in image" />
        <SignInForm />
      </div>
    </div>
  </section>
);

export default Login;
