import React from 'react';
import StateA from '../StateA/StateA';
import StateB from '../StateB/StateB';

export default class User extends React.Component {
  render() {
    return (
      <div>
        <h3>user component</h3>
        <h5>Demo of React Context API</h5>
        <StateA></StateA>
        <StateB></StateB>
      </div>
    )
  }
};
