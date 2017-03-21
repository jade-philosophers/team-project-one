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
    this._goToHowItWorks = this._goToHowItWorks.bind(this);
    this._goToTermsOfService = this._goToTermsOfService.bind(this);
    this._goToPrivacy = this._goToPrivacy.bind(this);
    this._goToAboutTheTeam = this._goToAboutTheTeam.bind(this);
    this._goToHelpAndSupport = this._goToHelpAndSupport.bind(this);
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
      axios.post(helpers.HOST_URL + 'api/toggle_off', JSON.parse(loc)).then(response => {
          console.log('successfully removed');
      });
    }
    await AsyncStorage.clear().then(()=> {
      this.props.navigator.push(Router.getRoute('login'));
    });
  }

  _goToHowItWorks () {
    this.props.navigator.push(Router.getRoute('howitworks'));
  }

  _goToTermsOfService () {
    this.props.navigator.push(Router.getRoute('termsofservice'));
  }  

  _goToPrivacy () {
    this.props.navigator.push(Router.getRoute('privacy'));
  }  

  _goToAboutTheTeam () {
    this.props.navigator.push(Router.getRoute('abouttheteam'));
  }    
  
  _goToHelpAndSupport () {
    this.props.navigator.push(Router.getRoute('helpandsupport'));
  }  

  render() {
    return (
      <Container>
          <Content>
              <ListItem onPress={this._goToHowItWorks}>
                  <Text>How It Works</Text>
              </ListItem>
              <ListItem onPress={this._goToTermsOfService}>
                  <Text>Terms Of Service</Text>
              </ListItem>              
              <ListItem onPress={this._goToPrivacy}>
                  <Text>Privacy</Text>
              </ListItem>
              <ListItem onPress={this._goToAboutTheTeam}>
                  <Text>About The Team</Text>
              </ListItem>              
              <ListItem onPress={this._goToHelpAndSupport}>
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
