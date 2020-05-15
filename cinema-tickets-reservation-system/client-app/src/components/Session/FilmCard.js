import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  card: {
    width: '100%',
    marginRight: '5%',
    backgroundColor: '#f0f2f6',
  },
  title: {
    color: '#4867c0',
    fontSize: '1.25rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  description: {
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  header: {
    fontWeight: 700,
    fontSize: '1rem',
  },
});

class FilmCard extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.title}
          classes={{
            title: classes.title,
          }}
        />
        <CardMedia height="140" className={classes.media} image={this.props.image} />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph className={classes.header}>
              Description
            </Typography>
            <Typography paragraph className={classes.description}>
              {this.props.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

PropTypes.shape({ classes: PropTypes.object.isRequired });

export default withStyles(styles)(FilmCard);
