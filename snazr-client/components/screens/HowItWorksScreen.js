import React, { Component } from 'react';
import Router from '../navigation/Router';
import { Container, Content, Icon , Text, ListItem } from 'native-base';

export default class HowItWorksScreen extends Component {
  static route = {
    navigationBar: {
      title: 'How It Works',
      backgroundColor: '#BA90FF',
      tintColor: '#ffff'
    }
  }

  render(){
    return (
      <Container>
        <Content>
          <ListItem>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>To start snazring:</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 6 }}>1. Switch the toggle on the top-right corner of the <Icon style={{fontSize: 14}}name="home" /> screen to let other photographers find you.</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 6 }}>2. View the photos taken of you inside the Gallery!</Text>
          </ListItem>          
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>3. Showcase your photography skills by selecting the <Icon style={{fontSize: 14}}name="map" /> screen to find nearby models who want their glamour shot.</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>4. Once you find a model, tap his/her profile icon to turn on the camera and begin snazring away!</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 14, marginTop: 4 }}>5. If you wish to log out, tap the Facebook icon on the <Icon style={{fontSize: 14}}name="settings" /> screen.</Text>
          </ListItem>
        </Content>
      </Container>
    )
  }
}