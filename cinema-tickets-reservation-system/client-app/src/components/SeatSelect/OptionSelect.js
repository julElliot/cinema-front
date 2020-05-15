import React from 'react';
import ExtraItem from './ExtraItem';

const OptionSelect = props => (
  <div className="extra-services__container">
    {Object.keys(props.extraServices).map(key => (
      <ExtraItem
        key={key}
        label={key}
        price={props.extraServices[key]}
        chosenExtraServices={props.chosenExtraServices}
        callBackHandleClick={props.callBackHandleClick}
        callBackCheckBoxChanged={props.callBackCheckBoxChanged}
      />
    ))
    }
  </div>
);

export default OptionSelect;
