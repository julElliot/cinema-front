import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { links } from '../config/links';
import Header from '../components/Authentication/Header';
import ProfilePageNavBar from '../components/ProfilePage/ProfilePageNavBar';
import '../components/ProfilePage/profilePage.scss';
import AccountSettings from '../components/ProfilePage/AccountSettings';
import ProfilePageContent from '../components/ProfilePage/ProfilePageContent';
import OrderTable from '../components/ProfilePage/OrdersTable';
import { fetchOrders } from '../store/actions/orderAction';


class ProfilePage extends Component {
  state = {
    isLoading: false,
  };

  componentDidMount() {
    const typeOfOrders = this.props.location.pathname === '/profile' ? 'current' : 'previous';
    this.props.fetchOrders(1, typeOfOrders).then(() => {
      this.setState({
        isLoading: true,
      });
    });
  }

  setPage = (page = 1, typeOfOrders = 'current') => {
    this.setState({
      isLoading: false,
    });
    this.props.fetchOrders(page, typeOfOrders).then(() => {
      this.setState({
        isLoading: true,
      });
    });
  }

  render() {
    const { userInfo } = this.props;
    return (
      <section className="page-content">
        <div className="container">
          <Header header="Profile page" />
          {!this.state.isLoading
            ? (
              <div className="loadingBlock">
                <Loader
                  type="Puff"
                  color="#ffc107c9"
                  height="100"
                  width="100"
                  className="loader"
                />
              </div>
            )
            : (
              <div className="row profile-page__container">
                <ProfilePageNavBar
                  userInfo={userInfo}
                  handlePageClick={this.setPage}
                />
                <ProfilePageContent>
                  <Switch>
                    <Route
                      exact
                      path={links.ORDERS_PAGE}
                      render={props => (
                        <OrderTable
                          {...props}
                          orders={this.props.orders}
                          handlePageClick={page => this.setPage(page, 'current')}
                          currentPage={this.props.currentPage}
                          nextPage={this.props.nextPage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={links.PREVIOUS_ORDERS_PAGE}
                      render={props => (
                        <OrderTable
                          {...props}
                          orders={this.props.orders}
                          handlePageClick={page => this.setPage(page, 'previous')}
                          currentPage={this.props.currentPage}
                          nextPage={this.props.nextPage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={links.PROFILE_PAGE}
                      render={props => <AccountSettings {...props} userInfo={userInfo} />}
                    />
                  </Switch>
                </ProfilePageContent>
              </div>
            )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orderList,
  userInfo: state.user.userInfo,
  currentPage: state.order.currentPage,
  nextPage: state.order.nextPage,

});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (page, typeOfOrders) => dispatch(fetchOrders(page, typeOfOrders)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
