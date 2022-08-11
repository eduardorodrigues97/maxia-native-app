// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// Component imports
// import Main from './components/main';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
// import { StateProvider } from './components/context';

import * as SplashScreen from 'expo-splash-screen';
import SplashScreenFadeOut from './SplashScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default App = () => {
    // Define refs
    const webRef = useRef(null);
    const [url, setUrl] = useState('http://teste.maxia.education/');
    const [statusBarBackgroundColor, setStatusBarBackgroundColor] = useState('#F2F2F2');

    // SplashScreen defs
    const [status, setStatus] = useState(1);

    const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
    }

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
        <>
        <SafeAreaView style={{...styles.container, display: (status === 3) ? 'flex' : 'none'}}>
            <WebView
                ref={webRef}
                source={{
                    uri: url,
                    // Settar os cookies tbm funciona! No nativo (release) vai ser possível salvar os
                    // cookies na localStorage e passar direto por aqui
                    // headers: {
                    //     // Limpar cookie de autenticação na abertura do WebView
                    //     // Cookie: '_maxia_session="jQ8%2BKiyunLRB7Fo01uJ4k7hZkGGvX7SphwTNhx7vwMMq7Bu26sEFZGpHFMPHxBxA11XEUsMcjTq2fohUX6FGARZSAPRLNef9fh%2BDHuG6orhMrqdvlK7U%2FCeFzQJwW9cEGagEHuTvjWDMPVoI%2FDN2AyHTF%2FbubjbPaB9v1qAoZny6NC3CIC7KKOGLjaHioASP%2BBdhkiJ3mmLe3XALqrTvwppBz25c%2FIOJfKk6Ewuakqh9O1pdFRB2ZVU%2FPo8rvk24D79g42cicwQgQWt2Ub5%2FPDD50U7%2FqQH9B9HUIq%2B5Dd8IzViVptw%2FzXlryeGHRyA%2FB4ubP1LU%2B0EDbPFm9cYwZurENbU%2F1xlpU2juNB1NMNqOGjCujFWQ8OoDnMBroOZ%2FtmBP9FQvvo6eZZ1Ysz7myrOKVlM3nxjOVhLf29%2B8w9EcJH5pvwpTo5l3g7jmkq%2Fz8dOEaJVnrGYcfCuXNbcfJAnuPghVpix0KQ3orvTPJP8p%2Bi8JSytIckCl8jkvSzNQJd2FQBrS%2F68%2BnDOK7sOfq7RTRbmjypbjE0AvZa%2Fm%2Fxg6kNjqHM9ShORDM4L%2FmT6hUhZHDfCsld%2B4I1MhQWIaGG7%2BARXe0Q%3D%3D--C7FBzsudBg%2BGbVfV--rfnrBapuJnqBx4gDrpXxXg%3D%3D"'
                    //     // Cookie: '_maxia_session="none"'
                    // },
                }}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} //for iOS
                onNavigationStateChange={onShouldStartLoadWithRequest} //for Android
                // injectedJavaScript={javascriptInjection}
                // javaScriptEnabled={true}
                sharedCookiesEnabled={true}
                // onMessage={({ data }) => { return data }}
                onLoadEnd={()=>{
                    url.includes("sign_in") ? setStatusBarBackgroundColor("#F2F2F2") : setStatusBarBackgroundColor("white");
                    // setAppIsReady(true);
                    setStatus(2);
                }}
                // onLoadProgress={({nativeEvent})=>{console.log(nativeEvent.progress)}}
            />
            <StatusBar style="dark" translucent={true} backgroundColor={(status === 3) ? statusBarBackgroundColor : 'transparent'} />
        </SafeAreaView>
        {(status !== 3) && <SplashScreenFadeOut
        onAnimationEnd={()=>{setStatus(3)}}
        onAnimationStart={() => {hideSplashScreen()}}
        status={status}
        />
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});