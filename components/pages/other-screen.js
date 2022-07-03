import { Text, View, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Card, Button } from "react-native-elements";
import { SvgXml, SvgUri } from 'react-native-svg';
import { React, useRef, useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default OtherScreen = function() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Other Screen</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    // Global Container
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight*1.4,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '75%'
        // paddingBottom: '10%'
    },

    // Text
    text: {
        color: '#afafaf',
        fontSize: 36,
        padding: 10,
        textAlign: 'center',
        fontFamily: 'Bold'
    }
});
