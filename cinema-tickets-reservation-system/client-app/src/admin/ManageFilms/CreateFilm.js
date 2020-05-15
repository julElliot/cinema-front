import React, { Component } from 'react';
import { Field, Form } from 'redux-form';
import PropTypes from 'prop-types';
import TextInput from '../../shared/TextInput/TextInput';
import ImageUploader from '../ImageUploader/ImageUploader';
import * as validators from '../../helper/Validators';
import './filmTab.scss';


class FilmTab extends Component {
  static defaultProps = {
    initialValues: null,
  };

  static propTypes = {
    initialValues: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      photo: PropTypes.string,

    }),
  };

  onSubmit = (values) => {
    if (this.props.isEditable) {
      this.props.updateFilm(this.props.film._id, values, this.props.initialValues.photo);
    } else {
      this.props.addFilmInfo(values);
    }
  };

  render() {
    const {
      handleSubmit, pristine, submitting, isEditable,
    } = this.props;
    return (
      <Form className="film-tab__form" onSubmit={handleSubmit(this.onSubmit)} noValidate>
        <label className="film-tab__form-label" htmlFor="name">
          {'What is your film name?'}
          <Field
            validate={[validators.isRequired]}
            className="film-tab__form-field"
            name="name"
            component={TextInput}
            type="text"
            essence="Film name"
            placeholder="Film name"
          />
        </label>
        <label className="film-tab__form-label" htmlFor="description">
          {'What is description of your film name?'}
          <Field
            validate={[validators.isRequired]}
            className="film-tab__form-field"
            name="description"
            component={TextInput}
            rows={5}
            type="text"
            essence="Film description"
            placeholder="Film Description"
          />
        </label>
        {/*
        <div>
          <Field
            name="duration"
            component={TextField}
            label="Duration"
            validate={[validators.isRequired]}
          />
        </div>  */}
        {
          ((isEditable && this.props.initialValues) || !isEditable)
          && (
            <label className="film-tab__form-label" htmlFor="photo">
              {'Choose film poster'}
              <Field
                name="photo"
                className="film-tab__form-field"
                component={ImageUploader}
                validate={[validators.isRequired]}
                uploadedFile={this.props.initialValues}
              />
            </label>
          )
        }

        <div>
          <button
            className={`film-tab__button ${(pristine || submitting) && 'link-disabled'}`}
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </button>
        </div>
      </Form>
    );
  }
}

export default FilmTab;
