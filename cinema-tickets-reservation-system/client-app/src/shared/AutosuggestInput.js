import React, { PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    display: 'block',
    zIndex: 2,
    width: 230,
    color: '#484848',
    border: '1px solid #aaaaaa',
    backgroundColor: '#f3cdae',
    position: 'absolute',
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menuItem: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  dropDownMenu: {
    borderBottom: '1px solid #aaaaaa',
  },
});

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, items) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp(`${escapedValue}`, 'i');
  return items.filter(item => regex.test(item.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

class AutosuggestInput extends PureComponent {
  state = {
    value: this.props.value || '',
    suggestions: [],
  };

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);
    const { classes } = this.props;
    return (
      <MenuItem selected={isHighlighted} component="div" className={classes.dropDownMenu}>
        <div className={classes.menuItem}>
          {parts.map((part, index) => (part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 700 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )))}
        </div>
      </MenuItem>
    );
  };

  onChange = (_, { newValue }) => {
    const { onChange } = this.props;
    this.setState({
      value: newValue,
    });
    onChange(newValue);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.data),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const { classes, label, renderInputComponent } = this.props;

    const inputProps = {
      value,
      onChange: this.onChange,
      classes,
      label,
    };

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
      />
    );
  }
}

PropTypes.shape({ classes: PropTypes.object.isRequired });

export default withStyles(styles)(AutosuggestInput);
