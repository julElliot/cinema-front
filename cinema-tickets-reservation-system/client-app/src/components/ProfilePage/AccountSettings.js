import React from 'react';
import Input from '../Authentication/Input';
import InputGroup from '../Authentication/Input/InputGroup';

const AccountSettings = (props) => {
  const { userInfo } = props;
  return (
    <div className="accountSettings__container">
      <form action="" className="accountSettings__content">
        <InputGroup userInfo={userInfo} />
        <Input type="text" placeholder={`Email: ${userInfo.email}`} />
        <Input type="text" placeholder={`City: ${userInfo.location}`} />
        <Input type="text" placeholder={`Gender: ${userInfo.gender}`} />
      </form>
    </div>
  );
};

export default AccountSettings;
