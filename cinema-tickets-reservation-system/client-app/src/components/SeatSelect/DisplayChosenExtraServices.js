import React from 'react';

const DisplayChosenExtraServices = props => (
  <div className="extra-services__container">
    {Object.keys(props.chosenExtraServices).map(key => (
      <div key={key} className="extra-service__box">
        <p className="extra-item__name">{key}</p>
        <p>{`Count : ${props.chosenExtraServices[key]}`}</p>
        <p>{`Price for one : ${props.extraServices[key]}`}</p>
      </div>
    ))}
  </div>
);

export default DisplayChosenExtraServices;
