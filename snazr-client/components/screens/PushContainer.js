import React from 'react';
import { AppRegistry, DeviceEventEmitter, Text, View } from 'react-native';
import registerForPushNotificationsAsync from '../config/getToken';

class AppContainer extends React.Component {
  state = {
    notification: {},
  };

  componentWillMount() {
    this._notificationSubscription = DeviceEventEmitter.addListener(
      'Exponent.notification', this._handleNotification
    );
    if (this.props.exp.notification) {
      this._handleNotification(this.props.exp.notification);
    }
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('main', () => AppContainer);