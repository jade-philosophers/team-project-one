import React, { Component } from 'react';
import { View, Switch, AsyncStorage, Image } from 'react-native';
import Router from '../navigation/Router';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon , Text, ListItem } from 'native-base';

export default class InstructionsScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Instructions',
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
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>To get started:</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 6 }}>1. Select the switch in the top-right corner and notify others that you want your picture taken!</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>2. When you are finished, select the switch again to toggle the feature off.</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>3. To take pictures of others, select the <Icon style={{fontSize: 14}}name="map" /> button below to see nearby users who want their picture taken!</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>4. Once you've found someone, select their marker and the following callout to open the camera and begin shooting!</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>5. If you wish to logout, select the <Icon style={{fontSize: 14}}name="settings" /> button below</Text>
          </ListItem>
        </Content>
      </Container>
    )
  }
}