import React, { Component } from 'react';

class People extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
        <div>Jon</div>
        <div>Jonathan</div>
        <div>JoJo</div>
        <div>Patricio</div>
        <div>Patrick</div>
      </div>
    );
  }
}

export default People;