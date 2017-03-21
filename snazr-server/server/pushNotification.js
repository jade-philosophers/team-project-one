const Expo = require('exponent-server-sdk');

const triggerPushNotification = (token) => {
  let expo = new Expo()
  expo.sendPushNotificationsAsync([{
      // The push token for the app user to whom you want to send the notification 
      to: token,
      sound: 'default',
      body: 'A photographer has photographed you!',
      data: {withSome: 'Check out your new photo!'},
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
