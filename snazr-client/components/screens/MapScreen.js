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
    this._getNearby();
  }

  static route = {
    navigationBar: {
      title: 'Map',
      backgroundColor: '#BA90FF',
      tintColor: '#ffff'
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition( position => {
      let { latitude , longitude } = position.coords;
      this.setState({ latitude: latitude, longitude: longitude });
      this._getNearby();
      }, error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let { latitude , longitude } = position.coords;
      if ( helpers._distance( longitude - this.state.longitude, latitude - this.state.latitude ) > 0.002 ) {
        this.setState({ latitude: latitude, longitude: longitude });
        this._getNearby();
      }
    });
  }

  _getNearby() {
    let obj = { params: { lng: this.state.longitude.toFixed(2), lat: this.state.latitude.toFixed(2)} }
    axios.get(helpers.HOST_URL + 'api/toggled_users', obj).then(response => {
      console.log(response.data, 'users around');
      this.setState({ nearbyPeople: response.data });
    });
  }


  render() {
    return (
      <Map latitude={this.state.latitude} longitude={this.state.longitude} nearbyPeople={this.state.nearbyPeople}/>
    )
  }
}

