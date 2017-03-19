import React, { Component } from 'react';
import { View, Text } from 'react-native';
import helpers from '../config/util';
import Map from './Map';
import axios from 'axios';

export default class MapScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      nearbyPeople: []
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
      let obj = { params: { lng: longitude.toFixed(2), lat: latitude.toFixed(2)} }
      axios.get(helpers.HOST_URL + 'api/toggled_users', obj).then(response => {
        console.log(response.data);
        this.setState({ nearbyPeople: response.data });
      });
    });
  }


  render() {
    return (
      <Map latitude={this.state.latitude} longitude={this.state.longitude} nearbyPeople={this.state.nearbyPeople}/>
    )
  }
}

