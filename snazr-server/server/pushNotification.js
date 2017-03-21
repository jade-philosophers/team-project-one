const Expo = require('exponent-server-sdk');

const triggerPushNotification = (token) => {
  let expo = new Expo()
  expo.sendPushNotificationsAsync([{
      // The push token for the app user to whom you want to send the notification 
      to: token,
      sound: 'default',
      body: 'a photographer has photographed you!',
      data: {withSome: 'New picture taken of you!'},
    }])
    .then(receipt =>{
        console.log('pushNotification result:  ', receipt)
    })
    .catch( err => console.log('pushNotification error: ', err))
}

module.exports = {
  sendPush: triggerPushNotification,
  isToken: Expo.isExponentPushToken
}
