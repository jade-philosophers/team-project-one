import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Expo from 'expo'; 
import { createRouter, NavigationProvider, StackNavigation, TabNavigation, TabNavigationItem } from '@expo/ex-navigation';
import Router from './navigation/Router';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'react-thunk';
import rootReducer from '../state/reducers/index';


const store = createStore(rootReducer, applyMiddleware());

class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <NavigationProvider router={Router}>
          <StackNavigation initialRoute={Router.getRoute('login')} />
        </NavigationProvider>
      </Provider>
    );
  }
}

// connect(MapStateToProps)(App);
Expo.registerRootComponent(App);