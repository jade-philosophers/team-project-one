import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { AsyncStorage, Image, View, StyleSheet } from 'react-native';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: ''
    }
    this._setId();
  }

  async _setId() {
    const id = await AsyncStorage.getItem('com.snazr.id');
    this.setState({id: id});
  }

  render() {
    return (
      <MapView style={{flex: 1}} region={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        }}>
        <Marker coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}} title={"hi"} description={"test"}>
          <Image source={{uri: `http://graph.facebook.com/${this.state.id}/picture?type=small`}} style={styles.markers} />
        </Marker>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  markers: {
    borderRadius: 20,
    height: 40,
    width: 40
  }
});


export default Map;