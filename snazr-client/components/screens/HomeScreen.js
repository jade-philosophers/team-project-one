import React, { Component } from 'react';
import { View, Switch, AsyncStorage, Image, Dimensions, TouchableWithoutFeedback, DeviceEventEmitter } from 'react-native';
import Router from '../navigation/Router';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon , Text, ListItem } from 'native-base';
import Expo from 'expo';
import axios from 'axios';
import helpers from '../config/util';
import registerForPushNotificationsAsync from '../config/getToken';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      pictures: []
    }
    this._getInitialToggle();
    this._getPictures();
    this._refresh = this._refresh.bind(this);
    this._goToMap = this._goToMap.bind(this);
    this._done = this._done.bind(this);
    this._goToSettings = this._goToSettings.bind(this);
    this._toggleLocation = this._toggleLocation.bind(this);
    this._getAndSendLocationData = this._getAndSendLocationData.bind(this);
    this._searchAndRemoveLocationData = this._searchAndRemoveLocationData.bind(this);
  }
  
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
    const id = await AsyncStorage.getItem('com.snazr.id');
    const name = await AsyncStorage.getItem('com.snazr.name');
    this.setState({ id: id, name: name });
    const obj = {
      params: {
        userId: id
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
    helpers._getPosition().then(position => {
      let { longitude, latitude } = position.coords;
      console.log('sending location', this.state.id, this.state.name);
      let locationObj = {
       userId: this.state.id,
       name: this.state.name,
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
    axios.delete(helpers.HOST_URL + 'api/toggled_users', {data: this.state.location}).then(response => {
      console.log('successfully removed');
    });
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

  render() {
    if(this.state.photo) {
      return (
          <Container>
              <Header style={{backgroundColor: '#BA90FF'}}>
                  <Left>
                    <Button transparent onPress={this._done}>
                        <Text name='refresh' style={{color: '#ffff'}}>Done</Text>
                    </Button>
                  </Left>
                  <Body>
                      <Title style={{color:'#ffff'}}>Selection</Title>
                  </Body>
                  <Right>
                    <Switch onValueChange={this._toggleLocation} value={this.state.toggled} />
                  </Right>
              </Header>
              <Content>
                <Image source={{uri: this.state.photo}} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}/>
              </Content>
              <Footer>
                  <FooterTab>
                      <Button >
                        <Icon name="download" />
                      </Button>
                      <Button >
                        <Icon name="trash" />
                      </Button>
                  </FooterTab>
              </Footer>
          </Container>
      );
    } else {
      return(
          <Container>
            <Header style={{backgroundColor: '#BA90FF'}}>
              <Left>
                <Button transparent onPress={this._refresh}>
                    <Icon name='refresh' style={{color: '#ffff'}}/>
                </Button>
              </Left>
              <Body>
                  <Title style={{color:'#ffff'}}>Gallery</Title>
              </Body>
              <Right>
                <Switch onValueChange={this._toggleLocation} value={this.state.toggled} />
              </Right>
            </Header>
            <Content>
              <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                {this.state.pictures.map((photo, index) => <TouchableWithoutFeedback key={index} onPressIn={this._goToImg.bind(this, photo)}><Image source={{uri: photo}} style={{height: Dimensions.get('window').width/3.1, width: Dimensions.get('window').width/3.1, margin: 1}}/></TouchableWithoutFeedback> )}
              </View>
            </Content>
            <Footer>
              <FooterTab>
                <Button active style={{backgroundColor: '#DDC5FF'}}>
                  <Icon name="home" style={{color: '#ffff'}}/>
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
      )
    }
  }
}

