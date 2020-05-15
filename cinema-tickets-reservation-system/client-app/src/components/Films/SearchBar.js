import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DatePicker from './DatePicker';
import searchFilmActionHelpers from '../../helper/SearchFilmActionHelpers';
import AutosuggestInput from '../../shared/AutosuggestInput';

const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: 20,
  },
  input: {
    display: 'none',
  },
});

class SearchBar extends Component {
  state = {
    filmList: [],
    cinemaList: [],
  };

  componentDidMount() {
    this.setState({
      cinemaList: this.props.cinemaList,
      filmList: this.formatDataForAutosuggest(this.props.filmList),
    });
  }

  formatDataForAutosuggest = (dataList) => {
    const autosuggestList = [];
    dataList &&
      dataList.forEach((item) => {
        autosuggestList.push({ name: item });
      });
    return autosuggestList;
  };

  renderInputComponent(inputProps) {
    const { classes, label, inputRef, ...other } = inputProps;
    return (
      <TextField
        label={label}
        type="search"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        {...other}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const {
      selectedCity,
      sessionDate,
      filmName,
      cinema,
      onFilmNameChange,
      onCityChange,
      onCinemaChange,
      setSessionDate,
    } = this.props;
    console.log('cinema compt', this.state.cinemaList);
    return (
      <form className={classes.container} autoComplete="off">
        <TextField
          id="outlined-city"
          select
          label="City"
          className={classes.textField}
          type="search"
          value={selectedCity || ''}
          onChange={(e) => onCityChange(e.target.value)}
          margin="normal"
          variant="outlined"
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}>
          {this.props.cities &&
            this.props.cities.map((option) => (
              <MenuItem key={option} value={option}>
                {searchFilmActionHelpers.capitalizeFirstLatter(option)}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          id="outlined-city"
          select
          label="Cinema"
          className={classes.textField}
          type="search"
          value={cinema || ''}
          onChange={(e) => onCinemaChange(e.target.value)}
          margin="normal"
          variant="outlined"
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}>
          {this.state.cinemaList &&
            this.state.cinemaList.map((option) => (
              <MenuItem key={option} value={option}>
                {searchFilmActionHelpers.capitalizeFirstLatter(option)}
              </MenuItem>
            ))}
        </TextField>

        {/*  <AutosuggestInput
          onChange={onCinemaChange}
          renderInputComponent={this.renderInputComponent}
          label="Cinema"
          data={this.state.cinemaList}
          value={cinema}
        /> */}

        <DatePicker setSessionDate={setSessionDate} sessionDate={sessionDate} />
      </form>
    );
  }
}

PropTypes.shape({ classes: PropTypes.object.isRequired });

export default withStyles(styles)(SearchBar);
