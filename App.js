// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

// Component imports
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default App = () => {
    // Define refs
    const webRef = useRef(null);
    const [url, setUrl] = useState('http://teste.maxia.education/');
    const [statusBarBackgroundColor, setStatusBarBackgroundColor] = useState('#F2F2F2');

    // Helper functions
    // URL change handler
    const onShouldStartLoadWithRequest = function (navigator) {
        // this.canGoBack = navigator.canGoBack;
        // Set new URL to state
        // console.log(navigator.url)

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

        // if (navigator.url === 'http://teste.maxia.education/users/sign_in' && url === 'http://teste.maxia.education/') {
        //     webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
        //     setIsLoading(true);
        //     setAuth(false);
        //     save('maxiaSessionToken', '');
        //     save('email', '');
        //     save('password', '');
        //     setUrl(navigator.url);
        //     return false;
        // }

        setUrl(navigator.url);
        return true;
    }

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
                }}
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