import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { React, useRef, useState, useEffect, useContext } from 'react';
import Constants from 'expo-constants';
import { Card } from 'react-native-elements'
import { SvgUri } from 'react-native-svg';
import { Header } from "./helper"

export const Avaliacoes = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.viewMain}>
                <Header />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight*1.4,
        backgroundColor: '#fff',
    },
    viewMain: {
        flexGrow: 1,
        backgroundColor: '#f2f2f2',
    },
});