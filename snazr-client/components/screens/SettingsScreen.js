import React , { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { ListItem, Text, Content, Container, Button, Icon, Footer, FooterTab } from 'native-base';
import Router from '../navigation/Router';
import helpers from '../config/util';
import axios from 'axios';

export default class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this._logOut = this._logOut.bind(this);
    this._goToInstructions = this._goToInstructions.bind(this);
    this._goToHome = this._goToHome.bind(this);
    this._goToMap = this._goToMap.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Settings',
      backgroundColor: '#BA90FF',
      tintColor: '#ffff'
    }
  }

  _goToHome() {
    this.props.navigator.push(Router.getRoute('home'));
  }

  _goToMap() {
    this.props.navigator.push(Router.getRoute('map'));
  }

  async _logOut() {
    const loc = await AsyncStorage.getItem('com.snazr.location');
    if (helpers.toggled) {
      helpers.toggled = !helpers.toggled;
      axios.delete(helpers.HOST_URL + 'api/toggled_users', {data: this.state.location}).then(response => {
        console.log('successfully removed');
      });
    }
    await AsyncStorage.clear().then(()=> {
      this.props.navigator.push(Router.getRoute('login'));
    });
  }

  _goToInstructions () {
    this.props.navigator.push(Router.getRoute('instructions'));
  }

  render() {
    return (
      <Container>
          <Content>
              <ListItem onPress={this._goToInstructions}>
                  <Text>Instructions</Text>
              </ListItem>
              <ListItem>
                  <Text>Privacy</Text>
              </ListItem>
              <ListItem>
                  <Text>Terms Of Service</Text>
              </ListItem>
              <ListItem>
                  <Text>Help And Support</Text>
              </ListItem>
              <ListItem onPress={this._logOut}>
                  <Icon name="logo-facebook" style={{fontSize: 20, color: '#155094'}} /><Text>  Log Out!</Text>
              </ListItem>
          </Content>
            <Footer>
                <FooterTab>
                    <Button onPress={this._goToHome}>
                      <Icon name="home" />
                    </Button>
                    <Button onPress={this._goToMap}>
                      <Icon name="map" />
                    </Button>
                    <Button active style={{backgroundColor: '#DDC5FF'}}>
                      <Icon name="settings" style={{color: '#ffff'}} />
                    </Button>
                </FooterTab>
            </Footer>
      </Container>
    );
  }
}