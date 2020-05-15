/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router';
import Loader from 'react-loader-spinner';
import SeatSelect from '../components/SeatSelect/SeatSelect';
import Header from '../components/Authentication/Header';
import seatHelper from '../helper/SeatHelper';
import '../components/SeatSelect/seatSelect.scss';
import sessionInfo from '../components/SeatSelect/sessionInfo.json';
import ConfirmOrder from '../components/SeatSelect/ConfirmOrder';
import { getSessionById } from '../store/actions/seatsSelectionAction';
import { addOrder } from '../store/actions/orderAction';
import reservationServices from '../services/reservationServices';
import { links } from '../config/links';


const showErrorToast = (err) => {
  const message = err.response && err.response.data.error ? err.response.data.error.message : `${err}`;
  toastr.error(message);
};

class SeatsSelectionPage extends Component {
  state = {
    isSeatsChosen: false,
    seats: [],
    chosenSeats: [],
    chosenExtraServices: {},
    session: {
      info: sessionInfo,
    },
    isConfirmOrder: false,
    isTimerSet: false,
    finishTime: new Date(),
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
    window.addEventListener('beforeunload', this.saveStateToLocalStorage);
    this.hydrateStateWithLocalStorage();
    this.props
      .getSessionById(this.props.match.params.id)
      .then(() => {
        let seats = seatHelper.sortSeats(this.props.session.sessionSeats);
        seats = seatHelper.convertSeatsArray(seats, seatHelper.getSeatsRowsNumber(seats));
        this.setState({
          seats,
          isLoading: true,
        });
      })
      .catch((err) => {
        console.log(err);
        showErrorToast('Something went wrong');
      });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveStateToLocalStorage);
    this.removeStateFromLocalStorage();
    this.removeBooking();
  }

  saveStateToLocalStorage = () => {
    for (const key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  };

  removeStateFromLocalStorage = () => {
    for (const key in this.state) {
      localStorage.removeItem(key, JSON.stringify(this.state[key]));
    }
  };

  hydrateStateWithLocalStorage = () => {
    for (const key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  };

  removeBooking = () => {
    !this.state.isConfirmOrder
      && reservationServices
        .removeBooking(this.props.match.params.id, this.state.chosenSeats)
        .then(() => {
          console.log('unmount');
        })
        .catch(error => console.log(error));
  };

  updateChosenSeats = (seatInfo, chosenSeats) => {
    if (seatInfo.chosen) {
      chosenSeats.push(seatInfo);
    } else {
      chosenSeats.splice(chosenSeats.findIndex(el => el.row === seatInfo.row && el.column === seatInfo.column), 1);
    }
    return chosenSeats;
  };

  setTimer = () => {
    if (this.state.chosenSeats.length === 0) {
      const timeInMinutes = 0.5;
      const currentTime = Date.parse(new Date());
      const finishTime = new Date(currentTime + timeInMinutes * 60 * 1000);
      this.setState({
        isTimerSet: true,
        finishTime,
        isLoading: false,
      });
    }
  };

  handleSeatClick = (seatInfo) => {
    this.setTimer();
    const localSeats = [...this.state.seats];
    if (!this.state.seats[seatInfo.row][seatInfo.column].booked) {
      if (this.state.chosenSeats.length < 5 || seatInfo.chosen) {
        reservationServices
          .updateSeat(this.props.match.params.id, seatInfo)
          .then((res) => {
            if (res.data.isSuccessfully) {
              localSeats[seatInfo.row][seatInfo.column].chosen = !localSeats[seatInfo.row][seatInfo.column].chosen;
              this.setState(state => ({
                seats: localSeats,
                chosenSeats: this.updateChosenSeats(seatInfo, state.chosenSeats),
                isLoading: true,
              }));
            } else {
              toastr.warning(res.data.data);
              localSeats[seatInfo.row][seatInfo.column].booked = true;
              this.setState({
                seats: localSeats,
                isLoading: true,
              });
            }
          })
          .catch(error => console.log(error));
      }
    } else {
      this.setState({
        isLoading: true,
      });
    }
  };

  handleCancelConfirm = () => {
    this.setState({
      isSeatsChosen: false,
    });
  };

  handleSeatsSelect = () => {
    this.setState({
      isSeatsChosen: true,
    });
  };

  updateChosenExtraServices = (chosenExtraServices, extra, count, isSelect) => {
    if (isSelect) {
      chosenExtraServices[extra] = count;
    } else {
      delete this.state.chosenExtraServices[extra];
    }
    return chosenExtraServices;
  };

  handleExtraServicesSelect = extra => (event) => {
    const count = event.target.value;
    this.setState(state => ({
      chosenExtraServices: this.updateChosenExtraServices(state.chosenExtraServices, extra, count, true),
    }));
  };

  handleCheckBoxChanged = (extra, isSelect) => {
    this.setState(state => ({
      chosenExtraService: this.updateChosenExtraServices(state.chosenExtraServices, extra, 1, isSelect),
    }));
  };

  handleConfirmReservation = () => {
    reservationServices
      .bookSessionSeats(this.props.match.params.id, this.state.chosenSeats)
      .then(() => {
        this.props.addOrder(this.props.session, this.state.chosenSeats, this.state.chosenExtraServices);
        this.setState({
          isConfirmOrder: true,
        });
      })
      .catch(error => console.log(error));
  };

  renderReservationContent = () => {
    if (!this.state.isSeatsChosen) {
      return this.renderSeatsSelectContent();
    }

    return this.renderConfirmOrderContent();
  }

  delayRedirect = (event) => {
    const {
      history: { push },
    } = this.props;
    setTimeout(() => push(links.FILM_SEARCH_PAGE), 2000);
  };

  handleTimer = () => {
    toastr.warning('The time is up');
    this.delayRedirect();
  };

  renderSeatsSelectContent = () => (
    <Fragment>
      <Header header="Select Seats" />
      { !this.state.isLoading
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
          <SeatSelect
            seats={this.state.seats}
            chosenSeats={this.state.chosenSeats}
            chosenExtraServices={this.state.chosenExtraServices}
            sessionSeatTypes={this.props.session.session_info.seat_type}
            extraServices={this.props.session.session_info.extra_services}
            filmId={this.props.session.film._id}
            sessionId={this.props.match.params.id}
            isTimerSet={this.state.isTimerSet}
            finishTime={this.state.finishTime}
            callBackHandleSeatClick={this.handleSeatClick}
            callBackHandleSeatsSelect={this.handleSeatsSelect}
            callBackHandleExtraServicesSelect={this.handleExtraServicesSelect}
            callBackCheckBoxChanged={this.handleCheckBoxChanged}
            callBackHandleTimer={this.handleTimer}
          />
        )
      }
    </Fragment>
  )

  renderConfirmOrderContent = () => (
    <Fragment>
      <Header header="Info about order" />
      <ConfirmOrder
        isSeatsChosen={this.state.isSeatsChosen}
        chosenSeats={this.state.chosenSeats}
        chosenExtraServices={this.state.chosenExtraServices}
        callBackCancelConfirm={this.handleCancelConfirm}
        callBackConfirmReservation={this.handleConfirmReservation}
        sessionSeatTypes={this.props.session.session_info.seat_type}
        extraServices={this.props.session.session_info.extra_services}
        sessionId={this.props.match.params.id}
        sessionInfo={this.props.session}
      />
    </Fragment>
  )

  render() {
    return (
      <section className="page-content">
        <div className="container seat-select__container">{this.renderReservationContent()}</div>
      </section>
    );
  }
}

SeatsSelectionPage.defaultProps = {
  session: {
    session_info: {
      extra_services: {},
      seat_type: {},
    },
    film: {
      _id: 1,
    },
  },
  chosenSeats: [],
};

const mapStateToProps = state => ({
  session: state.seatsSelect.session,
});

const mapDispatchToProps = dispatch => ({
  getSessionById: id => dispatch(getSessionById(id)),
  addOrder: (session, chosenSeats, extraServices) => dispatch(addOrder(session, chosenSeats, extraServices)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SeatsSelectionPage));
