import React from 'react';
import SignUpForm from './SignUpForm';
import './styles/login.scss';
import Logo from './Logo';

const Register = () => (
  <section className="page-content authentication__form">
    <div className="container">
      <div className="authentication__content">
        <Logo src="../images/registration-form-2.jpg" alt="sing in image" />
        <SignUpForm />
      </div>
    </div>
  </section>
);

export default Register;
