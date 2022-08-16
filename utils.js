import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const notificationTypeEnum = {
    1: {
        title: "Nova validação aberta!",
        body: "Entre para validar agora",
    },
    2: {
        title: "Validação próxima do fechamento",
        body: "Você tem uma validação que será fechada em X dias.",
        data: { toSchedule: [] }
    },
    3: {
        title: "Validação fechada",
        body: "A validação x foi finalizada. Emoji",
        data: { toSchedule: [] }
    }
}

// Register and set notification details
const notificationsSetup = ( notificationListener, responseListener, setExpoPushToken ) => {
    // Set notification handler
    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
        }},
    });

    // Get PushToken
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        pushNotificationReceivedHandler(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        // For now, let's just go to the notifications screen (teste.maxia.education/notifications) (setUrl)
    });

    return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
    };
}

// Push API
// TODO - Colocar a API para receber uma lista
async function sendNotification(payload) {
    // payload = {
    //     pushToken: "token",
    //     type: 1,
    //     warningTime: "2022-08-13T16:27:00",
    //     endTime: "2022-08-13T16:28:00"
    // }
    if (payload.type === 1) {
        const message = {
            to: payload.pushToken,
            type: 1,
            sound: 'default',
            title: notificationTypeEnum[1].title,
            body: notificationTypeEnum[1].body,
            data: { toSchedule: [
                {
                    type: 2,
                    datetime: payload.warningTime
                },
                {
                    type: 3,
                    datetime: payload.endTime
                }
            ] },
        };
    
    
  
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }
}

// Push notifications handles
const pushNotificationReceivedHandler = async (notification) => {
    Notifications.getBadgeCountAsync().then(badge_count => Notifications.setBadgeCountAsync(badge_count + 1));
    // Check if there are any notifications to schedule
    let body = notification.request.trigger.payload.body;
    if (body.toSchedule) {
        body.toSchedule.forEach(schedulePushNotification);
    }

    // Notifications.getAllScheduledNotificationsAsync().then(nots=>console.log(nots))
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
  
    return token;
}

// Helper functions
async function schedulePushNotification(notification) {
    let now = Date.now();
    let dateSchedule = new Date(notification.datetime);
    await Notifications.scheduleNotificationAsync({
        content: notificationTypeEnum[notification.type],
        trigger: { seconds: (dateSchedule - now)/1000 },
    });
}

export { sendNotification, notificationsSetup }
