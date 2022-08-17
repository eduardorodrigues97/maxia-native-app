// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState, useEffect } from 'react';
import { StyleSheet, BackHandler } from 'react-native';

// Component imports
import OfflineScreen from './components/offline-screen';

import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

import { useScreenOrientationLock } from '@use-expo/screen-orientation';
import { OrientationLock } from 'expo-screen-orientation';

// Assets import
import sadBot from './assets/sad-bot.png';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const cantGoBackUrls = [
    'http://teste.maxia.education/',
    'http://teste.maxia.education/escolas/selecao_nivel',
    'http://teste.maxia.education/professores/avaliacao_producao',
    'http://teste.maxia.education/users/sign_out',
    'http://teste.maxia.education/users/sign_in'
]


export default App = () => {
    // Load background assets that can be loaded on background
    Asset.fromModule(sadBot).downloadAsync()

    // Define refs
    const webRef = useRef(null);
    const [url, setUrl] = useState('http://teste.maxia.education/');
    const [statusBarBackgroundColor, setStatusBarBackgroundColor] = useState('#F2F2F2');
    const [started, setStarted] = useState(0);
    const [isConnected, setIsConnected] = useState(true);
    console.log(url)
    // Helper functions
    // URL change handler
    const onShouldStartLoadWithRequest = function (navigator) {
        // INTERCEPT PDFs
        if (navigator.url.slice(-4) === '.pdf') {
            // setUrl(navigator.url);
            webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            WebBrowser.openBrowserAsync(navigator.url)
            return false;
        }

        // INTERCEPT first page and go directly to central de avaliacoes
        if (navigator.url === 'http://teste.maxia.education/escolas/selecao_nivel') {
            setUrl('http://teste.maxia.education/professores/avaliacao_producao');
            return false;
        }

        if ((navigator.url === 'http://teste.maxia.education/users/sign_in') & (url === 'http://teste.maxia.education/')) {
            const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking')
            RCTNetworking.clearCookies(() => {})
        }

        setUrl(navigator.url);
        return true;
    }

    const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
    }

    useScreenOrientationLock(OrientationLock.PORTRAIT_UP);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
            if ((cantGoBackUrls.includes(url)) ? false : true) {
                webRef.current.goBack();
                // webRef.current.injectJavaScript('checkUrlChange();')
                // setTimeout(() => {
                //     webRef.current.reload();
                // }, 700)
                return true;
            }
            return false;
        });
        return () => {
            backHandler.remove();
        };
    }, [url]);

    const injectJS =  `
    let initialUrl = window.location.href;
    let checkUrlChange = () => {
        const currentUrl = window.location.href;
        if(currentUrl !== initialUrl) {
            window.ReactNativeWebView.postMessage(currentUrl);
            initialUrl = currentUrl;
        }
    }
    setInterval(checkUrlChange, 50);
    `
    

    return (
        <>
        {(isConnected === false) &&
        <OfflineScreen setIsConnected={setIsConnected} webViewRef={webRef} />
        }
        <SafeAreaView style={{
            ...styles.container,
            display: (isConnected === true) ? 'flex' : 'none'
        }}>
            <WebView
                ref={webRef}
                source={{
                    uri: url
                }}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} //for iOS
                onNavigationStateChange={onShouldStartLoadWithRequest} //for Android
                sharedCookiesEnabled={true}
                onMessage={(event) => {
                    if (event.nativeEvent.data !== url) {
                        setUrl(event.nativeEvent.data);
                        webRef.current.reload();
                    }
                }}
                onLoadEnd={(syntheticEvent)=>{
                    if (started > 1) {
                        url.includes("sign_in") ? setStatusBarBackgroundColor("#F2F2F2") : setStatusBarBackgroundColor("white")
                    }
                    if (started < 2) {
                        setStarted(started+1);
                    }
                    if (started == 1) {
                        setTimeout(() => {
                            hideSplashScreen();
                        }, 1000);
                        setStarted(started+1);
                    }
                    
                    const { nativeEvent } = syntheticEvent;
                    if (!nativeEvent.loading) {
                        webRef.current.injectJavaScript(injectJS);
                    }
                }}
                startInLoadingState
                onError={({description}) => {setIsConnected(false);}}

                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
            <StatusBar style="dark" translucent={true} backgroundColor={statusBarBackgroundColor} />
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
