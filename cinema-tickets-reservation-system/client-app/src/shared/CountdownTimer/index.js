import React, { Component } from 'react';
import './countdownTimer.scss';

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      sec: 0,
      isFinish: false,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      if (date) {
        this.setState(date);
      } else {
        this.setState({
          isFinish: true,
        });
        this.stop();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
    if (diff <= 0) return false;
    const timeLeft = {
      min: 0,
      sec: 0,
      millisec: 0,
    };
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
    this.state.isFinish && this.props.handleTimer();
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = `0${value}`;
    }
    return value;
  }

  render() {
    const countDown = this.state;
    return (
      <div className="countdown__container">
        <span className="countdown__column">
          <span className="countdown__column__element">
            <strong>{this.addLeadingZeros(countDown.min)}</strong>
            <span>Min</span>
          </span>
        </span>

        <span className="countdown__column">
          <span className="countdown__column__element">
            <strong>{this.addLeadingZeros(countDown.sec)}</strong>
            <span>Sec</span>
          </span>
        </span>
      </div>
    );
  }
}

Countdown.defaultProps = {
  date: new Date(),
};

export default Countdown;
