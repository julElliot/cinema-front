import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import Select from 'react-select';

import './dropdownSelect.scss';

const customStyles = {
  input: provided => ({
    ...provided,
    paddingTop: 10,
    paddingBottom: 10,
  }),
  control: provided => ({
    ...provided,
    boxShadow: 'none',
  }),
};

const customTheme = theme => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary: 'rgb(1, 122, 133)',
    primary25: 'rgba(1, 122, 133,0.2)',
  },
});

class DropDownSelect extends PureComponent {
    static defaultProps = {
      className: '',
    };

    static propTypes = {
      className: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
          label: PropTypes.string.isRequired,
        }),
      ).isRequired,
      input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
      }).isRequired,
    };

    handleOnChange = option => this.props.input.onChange(option.value);

    render() {
      const { options, className, input } = this.props;

      const selectClasses = classNames('dropdown-select', className);

      return (
        <Select
          styles={customStyles}
          options={options}
          className={selectClasses}
          value={_.find(options, { value: input.value }) || options[0]}
          isSearchable
          theme={customTheme}
          onChange={this.handleOnChange}
        />
      );
    }
}

export default DropDownSelect;
