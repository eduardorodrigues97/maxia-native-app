// https://github.com/eduardorodrigues97/maxia-native-app

import React from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import sadBot from '../assets/sad-bot.png'; 

export default function OfflineScreen({ setIsConnected, webViewRef }) {
    // Define dimensions
    const dimensions = Dimensions.get('window');
    const robotWidth = Math.round(dimensions.width*0.3);

    const [reconnecting, setReconnecting] = React.useState(false);

    const pingGoogle = async () => {
        try {
            const online = await fetch('https://www.google.com');
            return online.status >= 200 && online.status < 300; // either true or false
        } catch (err) {
            return false; // definitely offline
        }
    }

    const reconnect = async () => {
        setReconnecting(true);
        setTimeout(() => {
            setReconnecting(false);
        }, 1000);
        // Try to ping the server
        let connected = await pingGoogle();
        if (connected) {
            webViewRef.current.reload();
            setIsConnected(true);
        }
    }

    // Return component
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <Image
            source={sadBot}
            style={{ width: robotWidth, height: robotWidth, resizeMode:'contain'}}
        />
        <Text style={{...styles.text, width: robotWidth*2.5}}>
            Parece que você está sem internet!
        </Text>
        <TouchableOpacity
            onPress={reconnect}
            disabled={reconnecting ? true : false}
            style={reconnecting ? [styles.button, styles.buttonDisabled] : styles.button}
        >
            <Text style={[styles.text, styles.textButton, reconnecting ? {color: '#494949'} : {}]}>
                RECONECTAR
            </Text>
        </TouchableOpacity>
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
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 0
    },
    button: {
        width: '80%',
        height: 70,
        backgroundColor: '#009dcc',
        borderRadius: 25,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#0087b1',
        shadowOpacity: 0.2,
        shadowRadius: 0.5,
        shadowOffset: {
            width: 2,
            height: 4
        }
    },
    buttonDisabled: {
        backgroundColor: '#f2f2f2',
        shadowColor: '#f1f1f1'
    }
});