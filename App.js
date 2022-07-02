// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import { OrientationLock } from 'expo-screen-orientation';
import { useScreenOrientationLock } from '@use-expo/screen-orientation';
import { useFonts } from 'expo-font';
import { LogBox, StatusBar } from 'react-native';

// Component imports
import OfflineScreen from './components/offline-screen';
import MyWebView from './components/web-view';
import LoginScreen from './components/login-screen';
// import LoadingScreen from './components/transitionScreens/loading-screen';


// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Ignore useless warnings
const ignoreWarns = [
  "ViewPropTypes will be removed"
];
const warn = console.warn;
console.warn = (...arg) => {
  for (let i = 0; i < ignoreWarns.length; i++) {
      if (arg[0].startsWith(ignoreWarns[i])) ;
  }
  warn(...arg);
};
LogBox.ignoreLogs(ignoreWarns);

export default function App() {
    // Load Fonts
    const [loaded] = useFonts({
        Light: require('./assets/fonts/DINNextRoundedLTPro-Light.ttf'),
        Medium: require('./assets/fonts/DINNextRoundedLTPro-Medium.ttf'),
        Regular: require('./assets/fonts/DINNextRoundedLTPro-Regular.ttf'),
        Bold: require('./assets/fonts/DINNextRoundedLTPro-Bold.ttf'),
    });
    
    // Lock screen rotation
    useScreenOrientationLock(OrientationLock.PORTRAIT_UP);

    // Get Net Info
    netInfo = useNetInfo();

    // If the fonts are not yet loaded, return without rendering
    if (!loaded) {
        return null;
    }

    if (netInfo.isConnected === false){
        return OfflineScreen()
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                {/* Auth Navigator: Include Login and Signup */}
                <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
                />
                {/* Navigation Drawer as a landing page */}
                <Stack.Screen
                name="MainApp"
                component={MyWebView}
                // Hiding header for Navigation Drawer
                options={{headerShown: false}}
                />
                {/* Loading Page */}
                {/* <Stack.Screen
                name="LoadingScreen"
                component={LoadingScreen}
                // Hiding header for Navigation Drawer
                options={{headerShown: false}}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
      );

    if (netInfo.isConnected === false){
        return OfflineScreen()
    }

    if (authenticationRequest() === true){
        return myWebView(webRef, url, setUrl)
    }


    // Main application components rendering
    // If there is connection, render the WebView
    if (netInfo.isConnected === true){
        return myWebView(webRef, url, setUrl)
    }
}
