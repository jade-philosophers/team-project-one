import React, { Component } from 'react';
import Expo from 'expo';
import { Text, View, StyleSheet, AsyncStorage, Image } from 'react-native';
import { Icon } from 'native-base';
import helpers from '../config/util';
import Router from '../navigation/Router';


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  async logIn() {
    const session = await AsyncStorage.getItem('com.snazr.name');
    if (!session) {
      const data = await Expo.Facebook.logInWithReadPermissionsAsync( helpers.FB_APP_ID, {
        permissions: ['user_photos', 'public_profile' ]
      });
      if ( data.type === 'success' ) {
        try {
          const response = await fetch(`https://graph.facebook.com/me?access_token=${data.token}`);
          const user = (await response.json());
          const resultToken = await AsyncStorage.setItem('com.snazr', data.token);
          const resultId = await AsyncStorage.setItem('com.snazr.id', user.id );
          const resultName = await AsyncStorage.setItem('com.snazr.name', user.name);
          this.props.navigator.push(Router.getRoute('home'));
        } catch (error) {
          console.log('Storage error: ' + error.message);
        }
      } 
    } else {
      this.props.navigator.push(Router.getRoute('home'));
    }
  }

  render () {
    return(
      <View style={styles.container}>
        <View>
          <Image style={{backgroundColor: '#eeee', height: 100, width: 300, marginTop: 50 }} source={require('../../assets/icons/app.png')} />
        </View>
        <View style={styles.facebook}>
          <Icon onPress={this.logIn} name="logo-facebook" style={{fontSize: 75, color: '#155094'}} />
        </View> 
    </View>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeee',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  facebook: {
    alignItems: 'center',
    marginTop: 50
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});
