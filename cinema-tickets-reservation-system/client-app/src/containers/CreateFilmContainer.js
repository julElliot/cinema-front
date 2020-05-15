import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import FilmTab from '../admin/ManageFilms/CreateFilm';

const mapStateToProps = state => ({
  initialValues: state.admin.film
    ? {
      name: state.admin.film.film_info.filmName,
      description: state.admin.film.film_info.description,
      photo: state.admin.film.film_info.poster_path,
    } : '',
  film: state.admin.film,
});


export default connect(mapStateToProps, null)(reduxForm({ form: 'filmForm' })(FilmTab));
