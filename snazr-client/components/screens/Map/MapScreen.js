import React, { Component } from 'react';
import { View, Text } from 'react-native';
import helpers from '../../config/util';
import Map from './Map';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import locationActionCreator from '../../../state/actions/locationActionCreator';
import nearbyPeopleActionCreator from '../../../state/actions/nearbyPeopleActionCreator';

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this._getNearby = this._getNearby.bind(this);
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
      this.props.locationActionCreator({
        latitude: latitude,
        longitude: longitude
      });
      // this.setState({ latitude: latitude, longitude: longitude });
      this._getNearby();
      }, error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let { latitude , longitude } = position.coords;
      if ( helpers._distance( longitude - this.props.location.longitude, latitude - this.props.location.longitude ) > 0.002 ) {
        // this.setState({ latitude: latitude, longitude: longitude });
        this._getNearby();
        this.props.locationActionCreator({
          latitude: latitude,
          longitude: longitude
        });
      }
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _getNearby() {
    let obj = { params: { lng: this.props.location.longitude.toFixed(2), lat: this.props.location.latitude.toFixed(2)} }
    axios.get(helpers.HOST_URL + 'api/toggled_users', obj).then(response => {
      console.log(response.data, 'users around');
      this.props.nearbyPeopleActionCreator(response.data);
    });
  }


  render() {
    return (
      <Map latitude={this.props.location.latitude} longitude={this.props.location.longitude} nearbyPeople={this.props.nearbyPeople}/>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    locationActionCreator: locationActionCreator,
    nearbyPeopleActionCreator: nearbyPeopleActionCreator
  }, dispatch);
}

function mapStateToProps(state){
  return {
    location: state.location,
    nearbyPeople: state.nearbyPeople
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
