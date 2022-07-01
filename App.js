// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef } from 'react';
import {useNetInfo} from "@react-native-community/netinfo";
import { OrientationLock } from 'expo-screen-orientation';
import { useScreenOrientationLock } from '@use-expo/screen-orientation';
import OfflineScreen from './components/offline-screen';
import myWebView from './components/web-view';

var started = false;

export default function App() {
  useScreenOrientationLock(OrientationLock.PORTRAIT_UP);
  netInfo = useNetInfo();
  webRef = useRef(null);

  if (started === true || netInfo.isConnected) {
    started = true;
    if (netInfo.isConnected === true){
      return myWebView(webRef)
    }
  }
  return OfflineScreen()
}
