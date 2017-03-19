import { createRouter } from '@expo/ex-navigation';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InstructionsScreen from '../screens/InstructionsScreen';


const Router = createRouter(() => ({
  login: () => LoginScreen,
  home: () => HomeScreen,
  map: () => MapScreen,
  settings: () => SettingsScreen,
  instructions: () => InstructionsScreen
}));

export default Router;
