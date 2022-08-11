// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

// Component imports
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default App = () => {
    // Define refs
    const webRef = useRef(null);
    const [url, setUrl] = useState('http://teste.maxia.education/');
    const [statusBarBackgroundColor, setStatusBarBackgroundColor] = useState('#F2F2F2');
    const [started, setStarted] = useState(0);

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

        setUrl(navigator.url);
        return true;
    }

    const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
    }

    useEffect(() => {
        setTimeout(() => {
            if (!started) {
                console.log("FAILED")
            }
        }, 5000);
        return () => {};
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <WebView
                ref={webRef}
                source={{
                    uri: url
                }}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} //for iOS
                onNavigationStateChange={onShouldStartLoadWithRequest} //for Android
                sharedCookiesEnabled={true}
                onMessage={({ data }) => { return data }}
                onLoadEnd={()=>{
                    url.includes("sign_in") ? setStatusBarBackgroundColor("#F2F2F2") : setStatusBarBackgroundColor("white")
                    if (started < 2) {
                        setStarted(started+1);
                    }
                    if (started == 1) {
                        hideSplashScreen();
                        setStarted(started+1);
                    }
                }}
                startInLoadingState
            />
            <StatusBar style="dark" translucent={true} backgroundColor={statusBarBackgroundColor} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});