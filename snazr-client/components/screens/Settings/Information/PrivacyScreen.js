import React, { Component } from 'react';
import { View, Switch, AsyncStorage, Image } from 'react-native';
import Router from '../../../navigation/Router';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon , Text, ListItem } from 'native-base';

export default class PrivacyScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Privacy',
      backgroundColor: '#BA90FF',
      tintColor: '#ffff'
    }
  }

  render(){
    return (
      <Container>
        <Content>
          <ListItem>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>Privacy</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 6 }}>Lorem ipsum.</Text>
          </ListItem>
        </Content>
      </Container>
    )
  }
}