import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Map from './Map.jsx';
import helpers from '../../config/util.jsx';
import '../styles/map.css';

class MapWrapper extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      zoom: 17
    };
    this.getPosition();
    this.returnToHome = this.returnToHome.bind(this);
  }

  returnToHome() {
    hashHistory.push('/');
  }

  getPosition () {
    helpers.getPosition().then(res => {
      this.setState({ lat: res.data.location.lat, lng: res.data.location.lng });
    });
  }

  render () {
    return (
      //set the container for the google map
      <div>
        <button onClick={this.returnToHome} >Return</button>
          <div className="map">
            <Map lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} />
          </div>
      </div>
    )
  }
}

export default MapWrapper;