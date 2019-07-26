import React from 'react';
import { Consumer } from "../../App";

export default class StateA extends React.Component {
  render() {
    return (
      <div>
        StateB:
        <Consumer>
          {
            ({val, setVal}) => (
              <div>
                <input type="text" value={val} onChange={e => setVal(e.target.value)}/>
              </div>
            )
          }
        </Consumer>
      </div>
    );
  }
}
