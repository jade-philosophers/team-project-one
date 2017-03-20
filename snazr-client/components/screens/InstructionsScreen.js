import React, { Component } from 'react';
import { View, Switch, AsyncStorage, Image } from 'react-native';
import Router from '../navigation/Router';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon , Text, ListItem } from 'native-base';

export default class InstructionsScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Instructions',
      backgroundColor: '#BA90FF',
      tintColor: '#ffff'
    }
  }

  render(){
    return (
      <Container>
        <Content>
          <ListItem>
            <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 25, fontSize: 35}}>  Welcome to SnazR!</Text>
          </ListItem>
          <ListItem>
            <Text style={{textAlign: 'center', fontStyle: 'italic', marginTop: 5, fontSize: 14}}>Your one place for photo sharing and expression!</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>To start snazring:</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 6 }}>1. Switch the toggle on the top-right corner of the <Icon style={{fontSize: 14}}name="home" /> screen to let other photographers find you.</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>2. Showcase your photography skills by selecting the <Icon style={{fontSize: 14}}name="map" /> button below to find nearby models who want their glamour shot!</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>3. Once you find a model, tap his/her profile icon to turn on the camera and begin snazring away!</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>4. If you wish to log out, select the <Icon style={{fontSize: 14}}name="settings" /> button below.</Text>
          </ListItem>
        </Content>
      </Container>
    )
  }
}