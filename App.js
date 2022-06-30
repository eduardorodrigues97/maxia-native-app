import * as React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {useNetInfo} from "@react-native-community/netinfo";
import bot2 from './assets/bot2.svg'; 

import { OrientationLock } from 'expo-screen-orientation';
import { useScreenOrientationLock } from '@use-expo/screen-orientation';

function ScreenOrientationLockExample() {
    const [lockInfo, lockError] = useScreenOrientationLock(OrientationLock.PORTRAIT);

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
export default function App() {
  ScreenOrientationLockExample();
  const netInfo = useNetInfo();


  if (started === true || netInfo.isConnected) {
    started = true;

    if (netInfo.isConnected === false) {
      alert('No Connection!')
    }

    return (
      <WebView 
        style={styles.container}
        source={{ uri: 'http://teste.maxia.education/' }}
      />
    )
  }
  const dimensions = Dimensions.get('window');
  const robotHeight = Math.round(dimensions.width*0.3);
  const robotWidth = robotHeight;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <Image
        source={bot2}
        style={{ width: robotHeight, height: robotHeight, resizeMode:'contain'}}
      />
      <Text style={styles.text}>Not Connected</Text>

    </View>
  );
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
    lineHeight: '100%',
    marginTop: 16
  }
});