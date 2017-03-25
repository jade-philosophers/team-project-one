import React, { Component } from 'react';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import Expo from 'expo';
import { AsyncStorage, Image, View, Text, StyleSheet } from 'react-native';
import { Icon, Toast, Button } from 'native-base';
import helpers from '../../config/util';
import { RNS3 } from 'react-native-aws3';
import config from '../../config/secure';
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
    let user = await AsyncStorage.getItem('com.snazr.user');
    this.setState({id: user.userId, name: user.name});
  }

  _setTargetCoords(e) {
    const { longitude, latitude } = e.nativeEvent.coordinate;
    this.setState({tarLng: longitude, tarLat: latitude});
  }

  async _takeImage(person) {
    if( helpers._distance(this.props.latitude - person.latPrecise, this.props.longitude - person.lngPrecise ) < 0.0002 ) {
      const result = await Expo.ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        const uri = result.uri;
        const type = uri.split('.')[1];
        const id = await uuidV1();
        const name = person.name.split('').join('-').toLowerCase() + '-' + id;
        const file = {
          uri: uri,
          name: name,
          type: `image/${type}`
        }
        RNS3.put(file, config.options).then(response => {
          if (response.status !== 201) {
            throw new Error("Failed to upload image to S3");
          } else {
            const imageObj = {
              userId: this.state.id,
              requestId: person.userId,
              cloudStorageUrl: response.body.postResponse.location
            }
            axios.post(helpers.HOST_URL + 'api/photos' , imageObj).then((response) => {
              console.log('successfully posted !', response.data);
            });
          }
        }).catch(err => console.log(err));
      }
    } else {
      return Toast.show({ text: 'Please move closer and try again.', position: 'bottom', buttonText: 'Done'});
    }
  }

  render() {
    if(this.props.latitude > 0) {
      return (
        <MapView style={{flex: 1}} region={this.state.region} onRegionChange={this._onRegionChange}>
          {this.props.nearbyPeople.map((person, index) => {
            return <Marker key={index} coordinate={{latitude: person.latPrecise, longitude: person.lngPrecise}} onPress={this._setTargetCoords}  onCalloutPress={this._takeImage.bind(this,person)} >
                    <Image source={{uri: `http://graph.facebook.com/${person.userId}/picture?type=small`}} style={styles.markers} />
                      <Callout>
                        <Text style={{textAlign: 'center'}}>{person.name.split(' ')[0]}</Text>
                        <Icon name="camera" style={{textAlign: 'center'}} />
                      </Callout>
                  </Marker>})}
          <Circle center={{latitude: this.props.latitude, longitude: this.props.longitude}} radius={100} strokeColor="transparent" fillColor="rgba(179,255,220,0.4)" />
        </MapView>
      );
    } else {
      return (
        <MapView style={{flex: 1}} region={this.state.region} onRegionChange={this._onRegionChange}>
          {this.props.nearbyPeople.map((person, index) => {
            return <Marker key={index} coordinate={{latitude: person.latPrecise, longitude: person.lngPrecise}} onPress={this._setTargetCoords}  onCalloutPress={this._takeImage.bind(this,person)} >
                    <Image source={{uri: `http://graph.facebook.com/${person.userId}/picture?type=small`}} style={styles.markers} />
                      <Callout>
                        <Text style={{textAlign: 'center'}}>{person.name.split(' ')[0]}</Text>
                        <Icon name="camera" style={{textAlign: 'center'}} />
                      </Callout>
                  </Marker>})}
        </MapView>
      );
    }
  }
}


const styles = StyleSheet.create({
  markers: {
    borderRadius: 20,
    height: 40,
    width: 40
  }
});

// export default connect(mapStateToProps)(Map);