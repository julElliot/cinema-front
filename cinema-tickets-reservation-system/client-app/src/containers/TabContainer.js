import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function TabContainer(props) {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;
