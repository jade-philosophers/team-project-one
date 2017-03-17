import React, { Component } from 'react';
import { View, Switch, AsyncStorage, Image } from 'react-native';
import Router from '../navigation/Router';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon , Text} from 'native-base';
import Expo from 'expo';
import axios from 'axios';
import helpers from '../config/util';


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: helpers.toggled
    }
    this._goToMap = this._goToMap.bind(this);
    this._toggleLocation = this._toggleLocation.bind(this);
    this._getAndSendLocationData = this._getAndSendLocationData.bind(this);
    this._searchAndRemoveLocationData = this._searchAndRemoveLocationData.bind(this);
    this._logOut = this._logOut.bind(this);
    this._takeImage = this._takeImage.bind(this);
  }

  static route = {
    // navigationBar: {
    //   title: 'Home',
    // }
  }

  _toggleLocation() {
    helpers.toggled = !helpers.toggled;
    this.setState({toggled: helpers.toggled});
    if( helpers.toggled ) {
      this._getAndSendLocationData();
    } else {
      this._searchAndRemoveLocationData();
    }
  }

  async _getAndSendLocationData() {
    const id = await AsyncStorage.getItem('com.snazr.id');
    const name = await AsyncStorage.getItem('com.snazr.name');
    helpers._getPosition().then(position => {
      let { longitude, latitude } = position.coords;
      console.log('sending location', id, name);
      //send position to the server for caching
      // let locationObj = {
      //  userId: id,
      //  name: name,
      //  lat: latitude,
      //  lng: longitude
      // }
      // axios.post('URL', locationObj, (req, res) => {

      // });
    });
    
  }

  _searchAndRemoveLocationData() {
    console.log('removing');
    //send user data and remove from cache
  }

  _goToMap() {
    this.props.navigator.push(Router.getRoute('map'));
  }

  _takeImage = async () => {
    let result = await Expo.ImagePicker.launchCameraAsync();
    console.log(result);
    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  async _logOut() {
    await AsyncStorage.clear(() => {
      this.props.navigator.push(Router.getRoute('login'));
    });
  }

  render() {
      return (
          <Container>
              <Header>
                  <Left>
                      <Button transparent>
                          <Icon name='menu' />
                      </Button>
                  </Left>
                  <Body>
                      <Title>Home</Title>
                      <Text style={{fontSize: 10}}>Request Photos!</Text>
                  </Body>
                  <Right>
                    <Switch onValueChange={this._toggleLocation} value={this.state.toggled} />
                  </Right>
              </Header>
              <Content>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 25, fontSize: 35}}>Welcome to SnazR!</Text>
                  <Text style={{textAlign: 'center', fontStyle: 'italic', marginTop: 5}}>Your one place for photo sharing and expression!</Text>
                  <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>To get started:</Text>
                  <Text style={{fontSize: 14, marginTop: 6 }}>1. Select the switch in the top-right corner and notify others that you want your picture taken!</Text>
                  <Text style={{fontSize: 14, marginTop: 4 }}>2. When you are finished, select the switch again to toggle the feature off.</Text>
                  <Text style={{fontSize: 14, marginTop: 4 }}>3. To take pictures of others, select the <Icon style={{fontSize: 14}}name="map" /> button below to see nearby users who want their picture taken!</Text>
                  <Text style={{fontSize: 14, marginTop: 4 }}>4. Once you've found someone, click the <Icon style={{fontSize: 14}}name="camera" /> button below to open the camera and begin shooting!</Text>
                  <Text style={{fontSize: 14, marginTop: 4 }}>5. If you wish to logout, select the <Icon style={{fontSize: 14}}name="settings" /> button below</Text>
              </Content>
              <Footer>
                  <FooterTab>
                      <Button active>
                        <Icon name="home" />
                      </Button>
                      <Button onPress={this._goToMap}>
                        <Icon name="map" />
                      </Button>
                      <Button onPress={this._takeImage}>
                        <Icon name="camera" />
                      </Button>
                      <Button onPress={this._logOut}>
                        <Icon name="settings" />
                      </Button>
                  </FooterTab>
              </Footer>
          </Container>
      );
  }
}

export default HomeScreen;