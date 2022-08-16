// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { notificationsSetup, sendNotification } from './utils';


export default App = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
        notificationsSetup(notificationListener, responseListener, setExpoPushToken)
    }, []);
  
    return (
        <View
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View> */}
            <Button
            title="Press to Send Notification"
            onPress={async () => {
                let now = new Date();
                await sendNotification({
                    pushToken: expoPushToken,
                    type: 1,
                    warningTime: new Date(now.getTime() + 20000).toString(),
                    endTime: new Date(now.getTime() + 30000).toString(), //'2022-08-13T17:10:20'
                });
            }}
            />
            {/* <Button
            title="Press to Clear badgeCount and clear bg notifications."
            onPress={async () => {
                await Notifications.cancelAllScheduledNotificationsAsync();
                await Notifications.setBadgeCountAsync(0);
            }}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
