import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import helpers from '../../config/util.jsx';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // defaultPos: {lat: 37.7749, lng: -122.4194}
    }
  }

  render () {
    return (
      //iterate through all the nearby people and place them on the map, creating react components for them
        <GoogleMapReact bootstrapURLKeys={{key: helpers.GOOGLE_MAPS_API_KEY}} center={{lat:this.props.lat, lng:this.props.lng}} defaultZoom = {this.props.zoom}>
          <div lat={this.props.lat} lng={this.props.lng}>sup</div>
        </GoogleMapReact>
    )
  }

}

export default Map;