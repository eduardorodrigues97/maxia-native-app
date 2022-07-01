// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import { OrientationLock } from 'expo-screen-orientation';
import { useScreenOrientationLock } from '@use-expo/screen-orientation';
import OfflineScreen from './components/offline-screen';
import myWebView from './components/web-view';
import loginScreen from './components/login-screen';

export default function App() {
    // Lock screen rotation
    useScreenOrientationLock(OrientationLock.PORTRAIT_UP);

    // Define states
    const [url, setUrl] = useState('http://teste.maxia.education/');

    // Define refs
    webRef = useRef(null);

    // Get Net Info
    netInfo = useNetInfo();

    return loginScreen();

    // Main application components rendering
    // If there is connection, render the WebView
    if (netInfo.isConnected === true){
        return myWebView(webRef, url, setUrl)
    }
    // Else, render the offlineScreen
    return OfflineScreen()
}
