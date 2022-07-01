// https://github.com/eduardorodrigues97/maxia-native-app

import React from 'react';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

var webRef =  null;
var last_uri = 'http://teste.maxia.education/';

export default function myWebView(newWebRef) {
    webRef = newWebRef;
    
    return (
        <WebView 
        ref={webRef}
        style={styles.container}
        source={{ uri: last_uri }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} //for iOS
        onNavigationStateChange ={onShouldStartLoadWithRequest} //for Android
        />
    )
}

const onShouldStartLoadWithRequest = function(navigator) {
    // INTERCEPT PDFs
    last_uri = navigator.url
    if (navigator.url.slice(-4) == '.pdf') {
        webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
        WebBrowser.openBrowserAsync(navigator.url)
        return false;
    }

    return true;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    }
});