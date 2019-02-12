import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="container header__content">
        <h1>{props.title}</h1>
        <button className="button button-link" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  );
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader;
