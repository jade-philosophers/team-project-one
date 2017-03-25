import React, { Component } from 'react';
import Expo, { Asset } from 'expo';
import { Text, View, StyleSheet, AsyncStorage, Image, Animated, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import helpers from '../../config/util';
import Router from '../../navigation/Router';
import config from '../../config/secure';
const videoSource = require('./../../../assets/icons/test.mp4');
const images = [require('../../../assets/icons/app.png'), require('../../../assets/icons/app2.png'), require('../../../assets/icons/test-ss.png')];

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }

    this._initialLogin();
    this._initialLogin = this._initialLogin.bind(this);
    this._logIn = this._logIn.bind(this);
  }

  async componentWillMount() {
    await images.map(image => {
      Asset.fromModule(image).downloadAsync();
    });
    Asset.fromModule(videoSource).downloadAsync().then(()=> {
      this.setState({loaded: true});
    });
  }

  async _initialLogin () {
    let session = await AsyncStorage.getItem('com.snazr.user');
    this.setState({session: JSON.parse(session)});
    if(session) {
      setTimeout(() => {
        this.props.navigator.push(Router.getRoute('home'));
      }, 1000);
    }
  }

  async _logIn() {
    if (!this.state.session) {
      const data = await Expo.Facebook.logInWithReadPermissionsAsync( config.FB_APP_ID, {
        permissions: ['user_photos', 'public_profile' ]
      });
      if ( data.type === 'success' ) {
        try {
          const response = await fetch(`https://graph.facebook.com/me?access_token=${data.token}`);
          const user = (await response.json());
          const userObj = {
            userId: user.id,
            name: user.name,
            token: data.token
          }
          const storeObj = await AsyncStorage.setItem('com.snazr.user', JSON.stringify(userObj));
          this.props.navigator.push(Router.getRoute('home'));
        } catch (error) {
          console.log('Storage error: ' + error.message);
        }
      } 
    } else {
      this.props.navigator.push(Router.getRoute('home'));
    }
  }
  
  render() {
    if (!this.state.loaded) {
      return <Expo.Components.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Expo.Components.Video style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height}} resizeMode="cover" source={videoSource} repeat={true} mute={true} />
        </View>
        <View style={styles.container}>
          <View>
            <Image style={{ height: 55, width: 300, marginTop: 100 }} source={images[0]} />
            <Image style={{ height: 20, width: 300, marginTop: 50}} source={images[1]} />
          </View>
          <View >
            <Icon onPress={this._logIn} name="logo-facebook" style={{fontSize: 70, color: '#155094', marginBottom: 30}} />
          </View> 
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black'
  }
});
