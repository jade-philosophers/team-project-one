import MapView from 'react-native-maps';
import Expo, { Permissions } from 'expo';


const helpers = {
  HOST_URL: 'http://0db132e7.ngrok.io/',
  FB_APP_ID: '269288420193827',
  toggled: false,
  _getPosition: async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Expo.Location.getCurrentPositionAsync({enableHighAccuracy: true});
    } else {
      throw new Error('Location permission not granted');
    }
  } 
}


export default helpers;