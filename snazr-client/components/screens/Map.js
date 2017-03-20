import React, { Component } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import Expo from 'expo';
import { AsyncStorage, Image, View, Text, StyleSheet } from 'react-native';
import helpers from '../config/util';
import { RNS3 } from 'react-native-aws3';
import config from '../config/secure';
import uuidV1 from 'uuid/v1';
import axios from 'axios';
// import io from 'socket.io-client';

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      tarLng: 0,
      tarLat: 0,
      region: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0025
      }
    }

    // this.socket = io(helpers.HOST_URL);
    // this.socket.on('response' , function(msg){
    //   console.log(msg);
    // });
    // this.socket.emit('hello', '1234');
    this._setIdAndName();
    this._onRegionChange = this._onRegionChange.bind(this);
    this._takeImage = this._takeImage.bind(this);
    this._setTargetCoords = this._setTargetCoords.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let region = {
      latitude: nextProps.latitude,
      longitude: nextProps.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025
    }
    this.setState({region: region});
  }

  _onRegionChange(region) {
    this.setState({region: region});
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
    const result = await Expo.ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      console.log(result.uri);
      const uri = result.uri;
      const type = uri.split('.')[1];
      const target = this.props.nearbyPeople.slice().filter(person => {return person.latPrecise === this.state.tarLat && person.lngPrecise === this.state.tarLng;});
      const id = await uuidV1();
      console.log(target, type, id);

      const name = target[0].name.split('').join('-').toLowerCase() + '-' + id;
      const file = {
        uri: uri,
        name: name,
        type: `image/${type}`
      }
      RNS3.put(file, config.options).then(response => {
        if (response.status !== 201) {
          throw new Error("Failed to upload image to S3");
        } else {
          console.log('uploaded response object', response.body.postResponse.location);
          const imageObj = {
            userId: this.state.id,
            requestId: target[0].userId,
            cloudStorageUrl: response.body.postResponse.location
          }
          axios.post(helpers.HOST_URL + 'photos' , imageObj).then((response) => {
            console.log('successfully posted !', response.data);
          });
        }
      }).catch(err => console.log(err));
    }
  }

  render() {
    return (
      <MapView style={{flex: 1}} region={this.state.region} onRegionChange={this._onRegionChange}>
        <Marker key={this.state.id} coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}} title={this.state.name} onPress={this._setTargetCoords} onCalloutPress={this._takeImage}>
          <Image source={{uri: `http://graph.facebook.com/${this.state.id}/picture?type=small`}} style={styles.markers} />
        </Marker>
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

