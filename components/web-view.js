// https://github.com/eduardorodrigues97/maxia-native-app

import React from 'react';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default function myWebView(webRef, url, setUrl) {
    const onShouldStartLoadWithRequest = function(navigator) {
        // INTERCEPT PDFs
        setUrl(navigator.url);
        if (navigator.url.slice(-4) == '.pdf') {
            webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            WebBrowser.openBrowserAsync(navigator.url)
            return false;
        }
    
        return true;
    }
    
    return (
        <WebView 
        ref={webRef}
        style={styles.container}
        source={{ uri: url }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} //for iOS
        onNavigationStateChange ={onShouldStartLoadWithRequest} //for Android
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    }
});