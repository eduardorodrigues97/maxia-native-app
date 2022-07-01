// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import { OrientationLock } from 'expo-screen-orientation';
import { useScreenOrientationLock } from '@use-expo/screen-orientation';
import OfflineScreen from './components/offline-screen';
import myWebView from './components/web-view';
import LoginScreen from './components/login-screen';
import { useFonts } from 'expo-font';
import {KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

export default function App() {
    // Load Fonts
    const [loaded] = useFonts({
        Default: require('./assets/fonts/Default.ttf'),
    });
    
    // Lock screen rotation
    useScreenOrientationLock(OrientationLock.PORTRAIT_UP);

    // Define states
    const [url, setUrl] = useState('http://teste.maxia.education/');

    // Define refs
    webRef = useRef(null);

    // Get Net Info
    netInfo = useNetInfo();

    // If the fonts are not yet loaded, return without rendering
    if (!loaded) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1, backgroundColor: '#f2f2f2'}}
            keyboardVerticalOffset = {0}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            >
                <LoginScreen />
            </ScrollView>
        </KeyboardAvoidingView>
    )

    // Main application components rendering
    // If there is connection, render the WebView
    if (netInfo.isConnected === true){
        return myWebView(webRef, url, setUrl)
    }
    // Else, render the offlineScreen
    return OfflineScreen()
}
