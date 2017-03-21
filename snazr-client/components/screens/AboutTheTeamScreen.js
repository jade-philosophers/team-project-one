import React, { Component } from 'react';
import Router from '../navigation/Router';
import { Container, Content, Text, ListItem } from 'native-base';

export default class AboutTheTeamScreen extends Component {
  static route = {
    navigationBar: {
      title: 'About The Team',
      backgroundColor: '#BA90FF',
      tintColor: '#ffff'
    }
  }

  render(){
    return (
      <Container>
        <Content>
          <ListItem>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>About The Team</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 6 }}>This app was created by Eric Chen, Felix Tran, Patrick Xie, and Veer Gangwal.</Text>
          </ListItem>                           
        </Content>
      </Container>
    )
  }
}