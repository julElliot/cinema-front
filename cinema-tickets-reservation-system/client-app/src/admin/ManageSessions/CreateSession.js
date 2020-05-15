import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import DropdownSelect from '../../shared/DropdownSelect/DropdownSelect';
import * as validators from '../../helper/Validators';
import { addSessionInfo } from '../../store/actions/adminActions';

import '../ManageFilms/filmTab.scss';

class SessionTab extends Component {
  componentDidMount() {
    if (this.props.isEditable) {
      this.props.fetchSession(this.props.match.params.id);
    }
    console.log(this.props.filmList);
    console.log(this.props.cinemaList);
  }

  onSubmit = (values) => {
    if (this.props.isEditable) {
      this.props.updateSession(this.props.match.params.id, values);
    } else {
      this.props.addSessionInfo(values);
    }
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <Form className="film-tab__form" onSubmit={handleSubmit(this.onSubmit)} noValidate>
        <label className="film-tab__form-label" htmlFor="film">
          {'What is your film name?'}
          <Field
            className="film-tab__form-field"
            name="film"
            component={DropdownSelect}
            options={this.props.filmList}
            validate={[validators.isRequired]}
          />
        </label>

        <label className="film-tab__form-label" htmlFor="cinema">
          {'What is your film name?'}
          <Field
            className="film-tab__form-field"
            name="cinema"
            component={DropdownSelect}
            options={this.props.cinemaList}
            validate={[validators.isRequired]}
          />
        </label>

        {/* <label className="film-tab__form-label" htmlFor="filmName">
            {'What is your film name?'}
            <Field
              validate={[validators.isRequired]}
              className="film-tab__form-field"
              name="filmName"
              component={TextInput}
              type="text"
              essence="Film name"
              placeholder="Film name"
            />
          </label> */}
        {/*         <label className="film-tab__form-label" htmlFor="cinema">
            {'What is description of your film name?'}
            <Field
              validate={[validators.isRequired]}
              className="film-tab__form-field"
              name="cinema"
              component={TextInput}
              rows={4}
              type="text"
              essence="Cinema"
              placeholder="Cinema"
            />
          </label> */}
        {/*
          <div>
            <Field
              name="duration"
              component={TextField}
              label="Duration"
              validate={[validators.isRequired]}
            />
          </div>  */}

        <div>
          <button
            className={`film-tab__button ${(pristine || submitting) && 'link-disabled'}`}
            type="submit"
            disabled={pristine || submitting}>
            Submit
          </button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  initialValues: state.admin.session
    ? {
        film: state.admin.session.film.film_info.filmName || '',
        cinema: state.admin.session.cinema.cinemaName || '',
        date: state.admin.session.date || '',
      }
    : '',
  session: state.admin.session,
  // isEditable: !!state.admin.film,
});

const mapDispatchToProps = (dispatch) => ({
  addSessionInfo: (data) => dispatch(addSessionInfo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({ form: 'sessionForm' })(SessionTab));
