import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

const CheckboxLabels = (props) => {
  const { classes } = props;

  return (
    <FormGroup row>
      <FormControlLabel
        control={(
          <Checkbox
            onChange={props.callBackHandleCheckBoxClick}
            value="checked"
            checked={props.isSelect}
            classes={{
              root: classes.root,
              checked: classes.checked,
            }}
          />
        )}
        label={`${props.label} (${props.price}$)`}
      />
    </FormGroup>
  );
};

PropTypes.shape({ classes: PropTypes.object.isRequired });

export default withStyles(styles)(CheckboxLabels);
