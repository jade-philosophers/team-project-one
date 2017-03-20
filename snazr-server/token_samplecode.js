// import Expo from 'exponent-server-sdk';
const Expo = require('exponent-server-sdk');
 
// Create a new Expo SDK client 
let expo = new Expo();

// To check if something is a push token 
let isPushToken = Expo.isExponentPushToken(somePushToken);
 
 
// To send push notifications -- note that there is a limit on the number of 
// notifications you can send at once, use expo.chunkPushNotifications() 
(async function() {
  try {
    let receipts = await expo.sendPushNotificationsAsync([{
      // The push token for the app user to whom you want to send the notification 
      to: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
      sound: 'default',
      body: 'This is a test notification',
      data: {withSome: 'data'},
    }]);
    console.log(receipts);
  } catch (error) {
    console.error(error);
  }
})();



function sendPush(token){
    expo.sendPushNotificationsAsync([{
      // The push token for the app user to whom you want to send the notification 
      to: `ExponentPushToken[${token}]`,
      sound: 'default',
      body: 'This is a test notification',
      data: {withSome: 'data'},
    }])
    .then(receipt =>{
        console.log(receipt)
    })
    .catch( err => console.log('pushNotification error: ', err))
}



/****** CLIENT  ***** */
import { Permissions, Notifications } from 'expo';
import { helpers } from '../config/util.js';
// const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';
const PUSH_ENDPOINT = helpers.HOST_URL;

async function registerForPushNotificationsAsync() {
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
       userId: @@@@@@@USER ID CHANGE THIS HEREE ASSHOLE
    },
  });
}



console.log(a())
function a (){
  console.log('foo')
}

console.log(a())
const a = function(){
  console.log('foo')
}


console.log(a())
const a = () => {
  console.log('foo')
}