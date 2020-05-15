import React from 'react';
import DisplaySeatsScheme from './DisplaySeatsScheme';
import DisplayChosenSeats from './DisplayChosenSeats';
import Header from '../Authentication/Header';
import RoutingButton from './RoutingButton';
import OptionSelect from './OptionSelect';
import OutputPrice from './OutputPrice';
import DisplaySeatsType from './DispalySeatsType';
import CountdownTimer from '../../shared/CountdownTimer';

const SeatSelect = props => (
  <div className="choose-seat__container">
    <div className="choose-seat__session-info-container">
      <DisplaySeatsType sessionSeatTypes={props.sessionSeatTypes} />
      {props.chosenSeats.length > 0 && props.isTimerSet && (
        <CountdownTimer date={`${props.finishTime}`} handleTimer={props.callBackHandleTimer} />
      )}
    </div>
    <DisplaySeatsScheme
      seats={props.seats}
      callBackHandleSeatClick={props.callBackHandleSeatClick}
      chosenSeats={props.chosenSeats}
      sessionSeatTypes={props.sessionSeatTypes}
    />
    <div className="chosen-seats__container">
      {props.chosenSeats.length !== 0 ? <Header header="Chosen seats" /> : ''}
      <DisplayChosenSeats chosenSeats={props.chosenSeats} sessionSeatTypes={props.sessionSeatTypes} />
    </div>
    <Header header="complementary services" />
    <OptionSelect
      callBackCheckBoxChanged={props.callBackCheckBoxChanged}
      extraServices={props.extraServices}
      chosenExtraServices={props.chosenExtraServices}
      callBackHandleClick={props.callBackHandleExtraServicesSelect}
    />
    <OutputPrice
      chosenSeats={props.chosenSeats}
      chosenExtraServices={props.chosenExtraServices}
      sessionSeatTypes={props.sessionSeatTypes}
      extraServices={props.extraServices}
    />

    <RoutingButton
      chosenSeats={props.chosenSeats}
      callBackHandleConfirmation={props.callBackHandleSeatsSelect}
      filmId={props.filmId}
      sessionId={props.sessionId}
    />
  </div>
);

export default SeatSelect;
