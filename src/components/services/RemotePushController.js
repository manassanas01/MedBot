import { useEffect } from 'react';
import { Linking } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { _cleardata, _storedata } from './AsyncStorageService';

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        _cleardata('fcm_device_token')
        _storedata('fcm_device_token', token)
        console.log('TOKEN:', token)
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: async function (notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)
        // process the notification here
        if (notification.foreground) {
          PushNotification.localNotification({
            title: notification.title,
            message: notification.message,
            channelId: notification.channelId,
            smallIcon: "icon",
            largeIcon: "icon"
          });
          console.log(notification.channelId)
        } else {
          if (notification.data.url != "" || notification.data.url == null) {
            let url = notification.data.url;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              await Linking.openURL(url);
            }
          }
        }
      },
      // Android only: GCM or FCM Sender ID
      senderID: '781569070287',
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])
  return null
}

export default RemotePushController