import React, { Component } from 'react';
import Router from '../navigation/Router';
import { Container, Content, Text, ListItem } from 'native-base';

export default class HelpAndSupportScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Help And Support',
      backgroundColor: '#BA90FF',
      tintColor: '#ffff'
    }
  }

  render(){
    return (
      <Container>
        <Content>
          <ListItem>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>Contact Us</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 6 }}>If you have any questions or issues, please reach out to us at snazr.us@gmail.com. We will get back to you as soon as possible.</Text>
          </ListItem>
        </Content>
      </Container>
    )
  }
}