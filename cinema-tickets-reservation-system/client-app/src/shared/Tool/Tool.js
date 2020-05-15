import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../Button/Button';

import './tool.scss';

class Tool extends PureComponent {
    static defaultProps = {
      className: '',
    };

    static propTypes = {
      // handleClick: PropTypes.func.isRequired,
      className: PropTypes.string,
      src: PropTypes.string.isRequired,
    };

    render() {
      const { handleClick, className, src } = this.props;

      const toolClasses = classNames('tool', className);

      return (
        <Button
          className={toolClasses}
          type="button"
          src={src}
          handleClick={handleClick}
        />
      );
    }
}

export default Tool;
