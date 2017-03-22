import MapView from 'react-native-maps';
import Expo, { Permissions } from 'expo';

const helpers = {
  toggled: false,
  HOST_URL: 'http://000d2c22.ngrok.io/',
  _distance: function(a, b) {
    return Math.sqrt( Math.abs(Math.pow(a,2) - Math.pow(b,2)) );
  }
}


export default helpers;