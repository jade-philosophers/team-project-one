import React, { Component } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import Expo from 'expo';
import { AsyncStorage, Image, View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import helpers from '../config/util';

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      tarLng: 0,
      tarLat: 0,
    }

    this.socket = io(helpers.HOST_URL);
    this.socket.on('response' , function(msg){
      console.log(msg);
    });
    this.socket.emit('hello', '1234');

    this._setIdAndName();
    this._takeImage = this._takeImage.bind(this);
    this._setTargetCoords = this._setTargetCoords.bind(this);
  }

  async _setIdAndName() {
    const id = await AsyncStorage.getItem('com.snazr.id');
    const name = await AsyncStorage.getItem('com.snazr.name');
    this.setState({id: id, name: name});
  }

  _setTargetCoords(e) {
    const { longitude, latitude } = e.nativeEvent.coordinate;
    this.setState({tarLng: longitude, tarLat: latitude});
  }

  async _takeImage(e) {
    let result = await Expo.ImagePicker.launchCameraAsync();
    console.log(result);
    if (!result.cancelled) {
        // fs.readFile(result.uri, function(err, buf){
        //   // it's possible to embed binary data
        //   // within arbitrarily-complex objects
        //   this.socket.emit('image', { image: true, buffer: buf });
        //   console.log('image file is initialized');
        // });
      //this.setState({image: result.uri});
    }
    //loop through all nearby people and find the one with lat/lng that match the target lat/lng
    //upload to aws attaching image to id --> key = id, value = array of images
  }

  render() {
    return (
      <MapView style={{flex: 1}} region={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        }}>
        {this.props.nearbyPeople.map((person, index) => {
          return <Marker key={index} coordinate={{latitude: person.latPrecise, longitude: person.lngPrecise}} title={person.name} onPress={this._setTargetCoords}  onCalloutPress={this._takeImage} >
              <Image source={{uri: `http://graph.facebook.com/${person.userId}/picture?type=small`}} style={styles.markers} />
            </Marker>})}
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

