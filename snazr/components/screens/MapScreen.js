import React, { Component } from 'react';
import { View, Text } from 'react-native';
import helpers from '../config/util';
import Map from './Map';

class MapScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    }
    this._getPosition();
  }

  static route = {
    navigationBar: {
      title: 'Map',
    }
  }

  _getPosition() {
    helpers._getPosition().then(position => {
      let { latitude, longitude } = position.coords;
      this.setState({latitude: latitude, longitude: longitude });
    });
  }

  render() {
    return (
      <Map latitude={this.state.latitude} longitude={this.state.longitude} />
    )
  }
}


export default MapScreen;