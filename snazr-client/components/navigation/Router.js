import { createRouter } from '@expo/ex-navigation';
import HomeScreen from '../screens/Home/HomeScreen';
import MapScreen from '../screens/Map/MapScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import HowItWorksScreen from '../screens/Settings/Information/HowItWorksScreen';
import TermsOfServiceScreen from '../screens/Settings/Information/TermsOfServiceScreen';
import PrivacyScreen from '../screens/Settings/Information/PrivacyScreen';
import AboutTheTeamScreen from '../screens/Settings/Information/AboutTheTeamScreen';
import HelpAndSupportScreen from '../screens/Settings/Information/HelpAndSupportScreen';


const Router = createRouter(() => ({
  login: () => LoginScreen,
  home: () => HomeScreen,
  map: () => MapScreen,
  settings: () => SettingsScreen,
  howitworks: () => HowItWorksScreen,
  termsofservice: () => TermsOfServiceScreen,
  privacy: () => PrivacyScreen,
  abouttheteam: () => AboutTheTeamScreen,
  helpandsupport: () => HelpAndSupportScreen
}));

export default Router;