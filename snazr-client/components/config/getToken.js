import { Permissions, Notifications } from 'expo';
import helpers from './util';
import axios from 'axios';
const PUSH_ENDPOINT = helpers.HOST_URL;
export default async function registerForPushNotificationsAsync(userId, method) {
  let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }
  let token = await Notifications.getExponentPushTokenAsync();
  return axios(helpers.HOST_URL + 'api/push_token', {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      token: {
        value: token,
       },
       userId: userId
    }
  });
}