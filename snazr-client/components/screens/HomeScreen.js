import React, { Component } from 'react';
import { View, Switch, AsyncStorage, Image } from 'react-native';
import Router from '../navigation/Router';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon , Text, ListItem } from 'native-base';
import Expo from 'expo';
import axios from 'axios';
import helpers from '../config/util';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: helpers.toggled
    }

    this._goToMap = this._goToMap.bind(this);
    this._goToSettings = this._goToSettings.bind(this);
    this._toggleLocation = this._toggleLocation.bind(this);
    this._getAndSendLocationData = this._getAndSendLocationData.bind(this);
    this._searchAndRemoveLocationData = this._searchAndRemoveLocationData.bind(this);
  }

  _toggleLocation() {
    helpers.toggled = !helpers.toggled;
    this.setState({toggled: helpers.toggled});
    if( helpers.toggled ) {
      this._getAndSendLocationData();
      // setTimeout(this._toggleLocation, 100000);
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
      let locationObj = {
       userId: id,
       name: name,
       lng: longitude.toFixed(2),
       lat: latitude.toFixed(2),
       latPrecise: latitude,
       lngPrecise: longitude,
      }
      axios.post(helpers.HOST_URL + 'api/toggled_users' , locationObj).then(response => {
        console.log('successfully posted');
        this.setState({location: locationObj});
      });
      AsyncStorage.setItem('com.snazr.location', JSON.stringify(locationObj));
    });
    
  }

  _searchAndRemoveLocationData() {
    console.log('removing');
    axios.post(helpers.HOST_URL + 'api/toggle_off', this.state.location).then(response => {
      console.log('successfully removed');
    });
  }

  _goToMap() {
    this.props.navigator.push(Router.getRoute('map'));
  }

  _goToSettings() {
    this.props.navigator.push(Router.getRoute('settings'));
  }


  render() {
      return (
          <Container>
              <Header>
                  <Left>
                      <Button transparent>
                          <Icon name='refresh' />
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
                <ListItem>
                  <Text>Gallery: Photos Taken Of You!</Text>
                </ListItem>
              </Content>
              <Footer>
                  <FooterTab>
                      <Button active>
                        <Icon name="home" />
                      </Button>
                      <Button onPress={this._goToMap}>
                        <Icon name="map" />
                      </Button>
                      <Button onPress={this._goToSettings}>
                        <Icon name="settings" />
                      </Button>
                  </FooterTab>
              </Footer>
          </Container>
      );
  }
}

