import { Permissions, Notifications } from 'expo';
import helpers from './util';
// const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';
const PUSH_ENDPOINT = helpers.HOST_URL;
export default async function registerForPushNotificationsAsync(userId) {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExponentPushTokenAsync();
  // POST the token to our backend so we can use it to send pushes from there
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: {
      token: {
        value: token,
       },
       userId: userId
    },
  });
}