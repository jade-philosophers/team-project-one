import { createRouter } from '@expo/ex-navigation';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HowItWorksScreen from '../screens/HowItWorksScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import AboutTheTeamScreen from '../screens/AboutTheTeamScreen';
import HelpAndSupportScreen from '../screens/HelpAndSupportScreen';


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