// https://github.com/eduardorodrigues97/maxia-native-app

import React, { useRef } from 'react';
import { Text, View, Button, Image, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {useNetInfo} from "@react-native-community/netinfo";
import bot2 from './assets/bot2.png'; 
import { OrientationLock } from 'expo-screen-orientation';
import { useScreenOrientationLock } from '@use-expo/screen-orientation';

function ScreenOrientationLockExample() {
    const [lockInfo, lockError] = useScreenOrientationLock(OrientationLock.PORTRAIT_UP);

    return (
        <View>
            {lockError
                ? <Text>Could not lock the screen to portrait mode</Text>
                : <Text>This screen is now locked to portrait mode</Text>
            }
        </View>
    );
}

var started = false;
var webRef =  null;
var netInfo = null;
var last_uri = 'http://teste.maxia.education/';
export default function App() {
  ScreenOrientationLockExample();
  netInfo = useNetInfo();
  webRef = useRef(null);

  let myWebView = (
    <WebView 
      ref={webRef}
      style={styles.container}
      source={{ uri: last_uri }}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} //for iOS
      onNavigationStateChange ={onShouldStartLoadWithRequest} //for Android
    />
  )

  if (started === true || netInfo.isConnected) {
    started = true;
    if (netInfo.isConnected === true){
      return myWebView
    }
  }
  const dimensions = Dimensions.get('window');
  const robotHeight = Math.round(dimensions.width*0.3);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <Image
        source={bot2}
        style={{ width: robotHeight, height: robotHeight, resizeMode:'contain'}}
      />
      <Text style={styles.text}>Parece que você está sem internet! Estamos tentando reconectá-lo...</Text>

    </View>
  );
}

const onShouldStartLoadWithRequest = function(navigator) {
  // INTERCEPT PDFs
  last_uri = navigator.url
  if (navigator.url.slice(-4) == '.pdf') {
      webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
      WebBrowser.openBrowserAsync(navigator.url)
      return false;
  } 
  
  else if (netInfo.isConnected === false){
      webRef.current.stopLoading();
      return true;
  }

  else {
      return true;
  }    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  // 
  text: {
    // fontFamily: 'DIN Next Rounded LT Pro,Arial,Helvetica,sans-serif',
    fontWeight: '500',
    color: '#afafaf',
    fontSize: 24,
    marginTop: 16
  }
});