import React, { Component } from 'react';
import { View, Switch, AsyncStorage, Image, Dimensions, TouchableWithoutFeedback, DeviceEventEmitter, AppRegistry } from 'react-native';
import Router from '../../navigation/Router';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon , Text, ListItem, Card, CardItem } from 'native-base';
import Expo from 'expo';
import axios from 'axios';
import helpers from '../../config/util';
import registerForPushNotificationsAsync from '../../config/getToken';
// import RNFetchBlob from 'react-native-fetch-blob';

export default class HomeScreen extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      toggled: false,
      pictures: [],
      notification: {}
    }

    this._getInitialToggle();
    this._getPictures();
    this._refresh = this._refresh.bind(this);
    this._goToMap = this._goToMap.bind(this);
    this._done = this._done.bind(this);
    this._deletePhoto = this._deletePhoto.bind(this);
    this._downloadPhoto = this._downloadPhoto.bind(this);
    this._goToSettings = this._goToSettings.bind(this);
    this._toggleLocation = this._toggleLocation.bind(this);
    this._getAndSendLocationData = this._getAndSendLocationData.bind(this);
    this._searchAndRemoveLocationData = this._searchAndRemoveLocationData.bind(this);
    // this._handleNotification = this._handleNotification.bind(this);
  }

  // componentWillMount() {
  //   this._notificationSubscription = DeviceEventEmitter.addListener('Exponent.notification', this._handleNotification);
  // }

  // _handleNotification(notification) {
  //   this.setState({notification: notification}, () => {
  //     Toast.show({

  //     });
  //   });
  // }

  async _getInitialToggle() {
    const toggle = await AsyncStorage.getItem('com.snazr.toggled');
    if(!toggle) {
      this.setState({toggled: false});
    } else {
      this.setState({toggled: true});
    }
  }

  async _toggleLocation() {
    if (this.state.toggled) {
      const toggled = await AsyncStorage.removeItem('com.snazr.toggled');
      this.setState({toggled: false});
      this._searchAndRemoveLocationData();
      registerForPushNotificationsAsync(this.state.id, 'DELETE')
    } else {
      const toggled = await AsyncStorage.setItem('com.snazr.toggled', 'toggled');
      this.setState({toggled: true});
      this._getAndSendLocationData();
      registerForPushNotificationsAsync(this.state.id, 'POST')
    }
  }

  async _getPictures() {
    let user = await AsyncStorage.getItem('com.snazr.user');
    user = JSON.parse(user);
    this.setState({ id: user.userId, name: user.name });
    const obj = {
      params: {
        userId: user.userId
      }
    }
    axios.get(helpers.HOST_URL + 'api/photos', obj )
         .then((resp) => {
           this.setState({pictures: resp.data[0].photos});
         })
         .catch((err) => {
           console.log(err);
         });
  }

  async _getAndSendLocationData() {
    navigator.geolocation.getCurrentPosition(position => {
        let { latitude , longitude } = position.coords;
        let locationObj = { userId: this.state.id, name: this.state.name, lng: longitude.toFixed(2), lat: latitude.toFixed(2), latPrecise: latitude, lngPrecise: longitude }
        console.log('sending location', this.state.id, this.state.name);
        axios.post(helpers.HOST_URL + 'api/toggled_users' , locationObj).then(response => {
          console.log('successfully posted');
          this.setState({location: locationObj});
          return response;
        }).then( response => {
          AsyncStorage.setItem('com.snazr.location', JSON.stringify(locationObj));
          this.watchID = navigator.geolocation.watchPosition(position => {
            let { latitude , longitude } = position.coords;
            if ( helpers._distance( longitude - this.state.longitude, latitude - this.state.latitude ) > 0.0002 ) {
              this._updateLocation(longitude, latitude);
            }
          })
        }).catch( err => console.log('ERROR: location not posted' , err));
      }), error => alert(JSON.stringify(error)), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} 
  }

  async _updateLocation(longitude, latitude) {
    console.log('UPDATING location', this.state.id, this.state.name);
    let oldLocation = await AsyncStorage.getItem('com.snazr.location');
    oldLocation = JSON.parse(oldLocation);
    let newLocation = { userId: this.state.id, name: this.state.name, lng: longitude.toFixed(2), lat: latitude.toFixed(2), latPrecise: latitude, lngPrecise: longitude };
    axios.put(helpers.HOST_URL + 'api/toggled_users' , {oldLoc: oldLocation, newLoc: newLocation} ).then(response => {
      console.log('successfully updated!');
      this.setState({location: newLocation});
      AsyncStorage.setItem('com.snazr.location', JSON.stringify(newLocation));
    });
  }


  async _searchAndRemoveLocationData() {
    console.log('removing');
    if (this.state.location) {
      axios.delete(helpers.HOST_URL + 'api/toggled_users', {data: this.state.location}).then(response => {
        console.log('successfully removed');
      });
    } else {
      const location = await AsyncStorage.getItem('com.snazr.location');
      axios.delete(helpers.HOST_URL + 'api/toggled_users', {data: JSON.parse(location)}).then(response => {
        console.log('successfully removed');
      });
    }
    navigator.geolocation.clearWatch(this.watchID);
  }

  _goToMap() {
    this.props.navigator.push(Router.getRoute('map'));
  }

  _goToSettings() {
    this.props.navigator.push(Router.getRoute('settings'));
  }

  _goToImg(photo) {
    // console.log('hiii', photo);
    this.setState({photo: photo});
    // console.log('other is', e._targetInst._currentElement)
  }

  _refresh() {
    this._getPictures();
  }

  _done() {
    this.setState({photo: undefined});
  }

  _deletePhoto() {
    axios.delete(helpers.HOST_URL + 'api/photos', {data: {userId: this.state.id, photo: this.state.photo}}).then(response => {
      console.log('photo deleted');
      this.setState({photo: undefined});
      this._refresh();
    });
  }

  _downloadPhoto() {
    console.log('Downloading, feature not implemented completely yet');
    // RNFetchBlob.config({
    //   fileCache : true,
    //   appendExt : 'jpg'
    //   })
    //   .fetch('GET', this.state.photo, {
    //   //some headers ..
    //   })
    //   .then((res) => {
    //   console.log('The file saved to ', res.path())
    // })
  }

  render() {
      return (
          <Container>
              <Header style={{backgroundColor: '#BA90FF'}}>
                  <Left>
                    {this.state.photo ? <Button transparent onPress={this._done}><Text name='refresh' style={{color: '#ffff'}}>Done</Text></Button> :
                                        <Button transparent onPress={this._refresh}><Icon name='refresh' style={{color: '#ffff'}}/></Button>}
                  </Left>
                  <Body>
                      {this.state.photo? <Title style={{color:'#ffff'}}>Selection</Title> : <Title style={{color:'#ffff'}}>Gallery</Title>}
                  </Body>
                  <Right>
                    <Switch onValueChange={this._toggleLocation} value={this.state.toggled} />
                  </Right>
              </Header>
              <Content>
                {this.state.photo ? <Image source={{uri: this.state.photo}} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}/> : 
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {this.state.pictures.map((photo, index) => <TouchableWithoutFeedback key={index} onPressIn={this._goToImg.bind(this, photo)}><Image source={{uri: photo}} style={{height: Dimensions.get('window').width/3.1, width: Dimensions.get('window').width/3.1, margin: 1}}/></TouchableWithoutFeedback> )}
                    </View>}
              </Content>
              <Footer>
                {this.state.photo ? 
                <FooterTab>
                      <Button onPress={this._downloadPhoto}><Icon name="download" /></Button>
                      <Button onPress={this._deletePhoto}><Icon name="trash" /></Button>
                </FooterTab> :
                <FooterTab>
                      <Button active style={{backgroundColor: '#DDC5FF'}}><Icon name="home" style={{color: '#ffff'}}/></Button>
                      <Button onPress={this._goToMap}><Icon name="map" /></Button>
                      <Button onPress={this._goToSettings}><Icon name="settings" /></Button>
                </FooterTab>
                }
              </Footer>
          </Container>
      );
    }
}

