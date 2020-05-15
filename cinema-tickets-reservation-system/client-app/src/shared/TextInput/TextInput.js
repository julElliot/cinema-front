import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './textInput.scss';

class TextInput extends PureComponent {
    static defaultProps = {
      icon: '',
      className: '',
    };

    static propTypes = {
      className: PropTypes.string,
      placeholder: PropTypes.string.isRequired,
      icon: PropTypes.string,
      type: PropTypes.string.isRequired,
      essence: PropTypes.string.isRequired,
      input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }).isRequired,
      meta: PropTypes.shape({
        touched: PropTypes.bool.isRequired,
      }).isRequired,
    };

    state = {
      isFocused: false,
    };

    handleBlur = () => {
      this.props.input.onBlur();
      this.setState({ isFocused: false });
    };

    handleFocus = () => {
      this.setState({ isFocused: true });
    };

    render() {
      const {
        className,
        placeholder,
        icon,
        essence,
        type,
        meta: { touched, error },
        input: { onChange, value },
        rows,
      } = this.props;

      const textInputClasses = classNames('text-input', className, {
        'text-input_focused': this.state.isFocused,
        'text-input_invalid': error && touched,
      });

      return (
        <div>
          <div className={textInputClasses}>
            {!rows ? (
              <input
                className="text-input__input"
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onChange={onChange}
                type={type}
                value={value}
                placeholder={placeholder}
              />
            ) : (
              <textarea
                className="text-input__input"
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onChange={onChange}
                type={type}
                value={value}
                placeholder={placeholder}
                rows={`${rows}`}
              />
            ) }
            {icon && <span className={`text-input__icon ${icon}`} />}
          </div>
          {(touched && error) && <span className="text-input_error">{`${essence} ${error}`}</span>}
        </div>
      );
    }
}

export default TextInput;
