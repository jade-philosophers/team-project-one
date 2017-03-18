import React, { Component } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import Expo from 'expo';
import { AsyncStorage, Image, View, Text, StyleSheet } from 'react-native';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      tarLng: 0,
      tarLat: 0,
      nearbyPeople: []
    }
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
      this.setState({image: result.uri});
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
        <Marker coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}} title={this.state.name} /*description={"test"}*/ onPress={this._setTargetCoords}  onCalloutPress={this._takeImage} >
          <Image source={{uri: `http://graph.facebook.com/${this.state.id}/picture?type=small`}} style={styles.markers} />
            <Callout>
                <View>
                  <Text >{this.state.name}</Text>
                </View>
            </Callout>
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