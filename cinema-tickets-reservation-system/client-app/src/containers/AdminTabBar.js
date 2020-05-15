import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import FilmIcon from '@material-ui/icons/OndemandVideo';
import CinemaIcon from '@material-ui/icons/Domain';
import SessionPinIcon from '@material-ui/icons/Today';
import { Route, NavLink } from 'react-router-dom';
import TabContainer from './TabContainer';
import ManageFilms from './ManageFilms';
import ManageCinemas from './ManageCinemas';
import ManageSessions from './ManageSessions';
import { links } from '../config/links';


const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  flexContainer: {
    justifyContent: 'space-around',
  },
});

function LinkTab(props) {
  return <Tab className="tab-link" component={NavLink} {...props} />;
}

class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <section className="page-content">
        <div className="container">
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleChange}
                variant="fullWidth"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                classes={{ flexContainer: classes.flexContainer }}
              >
                <LinkTab label="Film" exact to={links.MANAGE_MOVIES} icon={<FilmIcon />} />
                <LinkTab label="Cinema" exact to={links.MANAGE_CINEMAS} icon={<CinemaIcon />} />
                <LinkTab label="Session" exact to={links.MANAGE_SESSIONS} icon={<SessionPinIcon />} />
              </Tabs>
            </AppBar>
            <TabContainer>
              <Route path={links.MANAGE_MOVIES} component={ManageFilms} />
              <Route path={links.MANAGE_CINEMAS} component={ManageCinemas} />
              <Route path={links.MANAGE_SESSIONS} component={ManageSessions} />
            </TabContainer>

            {/*        {value === 0 && <TabContainer><ManageFilms /></TabContainer>}
            {value === 1 && <TabContainer>Item Two</TabContainer>}
            {value === 2 && <TabContainer>Item Three</TabContainer>} */}
          </div>
        </div>
      </section>
    );
  }
}

PropTypes.shape({ classes: PropTypes.object.isRequired });

export default withStyles(styles)(ScrollableTabsButtonForce);
