import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Expo from 'expo'; 
import { createRouter, NavigationProvider, StackNavigation, TabNavigation, TabNavigationItem } from '@expo/ex-navigation';
import Router from './navigation/Router';


class App extends Component {

  
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('login')} />
      </NavigationProvider>
    );
  }
}
 
Expo.registerRootComponent(App);