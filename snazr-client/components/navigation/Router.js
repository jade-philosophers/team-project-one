import { createRouter } from '@expo/ex-navigation';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import LoginScreen from '../screens/LoginScreen';

const Router = createRouter(() => ({
  login: () => LoginScreen,
  home: () => HomeScreen,
  map: () => MapScreen
}));

export default Router;
