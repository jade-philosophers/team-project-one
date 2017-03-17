import React, { Component } from 'react';
import MapView from 'react-native-maps';

class Map extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapView style={{flex: 1}} region={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        }}>
        <MapView.Marker coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}} title={"hi"} description={"test"} />
      </MapView>
    );
  }
}

export default Map;