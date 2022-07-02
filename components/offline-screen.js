// https://github.com/eduardorodrigues97/maxia-native-app

import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import sadBot from '../assets/sad-bot.png'; 

export default function OfflineScreen() {
    // Define dimensions
    const dimensions = Dimensions.get('window');
    const robotWidth = Math.round(dimensions.width*0.3);

    // Return component
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <Image
            source={sadBot}
            style={{ width: robotWidth, height: robotWidth, resizeMode:'contain'}}
        />
        <Text
            style={{...styles.text, width: robotWidth*2.5}}
        >
            Parece que você está sem internet! Estamos tentando reconectá-lo...
        </Text>
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
        marginTop: 16,
        textAlign: 'center'
    }
});