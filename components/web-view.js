// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState, useEffect, useContext } from 'react';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import Loading from './transitionScreens/loading-screen';
import { CommonActions } from '@react-navigation/native';
import { Context } from './context'


async function save(key, value) {
    try {
        await SecureStore.setItemAsync(key, value);
        console.log('Saved succesfully')
    } catch (error) {
        console.log('Could not save variable')
    }
}


export default function MyWebView({navigation}) {
    // Define states
    const [url, setUrl] = useState('http://teste.maxia.education/users/sign_in');
    const [javascriptInjection, setJavascriptInjection] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { authState } = useContext(Context);
    const [auth, setAuth] = authState;
    const dimensions = Dimensions.get('window');

    // Define refs
    webRef = useRef(null);

    // Helper functions
    // URL change handler
    const onShouldStartLoadWithRequest = function(navigator) {
        // Set new URL to state
        
        // INTERCEPT PDFs
        if (navigator.url.slice(-4) === '.pdf') {
            setUrl(navigator.url);
            webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            WebBrowser.openBrowserAsync(navigator.url)
            return false;
        }
    
        if (navigator.url === 'http://teste.maxia.education/users/sign_in' && url === 'http://teste.maxia.education/') {
            webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            setIsLoading(true);
            setAuth(false);
            save('maxiaSessionToken', '');
            save('email', '');
            save('password', '');
            setUrl(navigator.url);
            return false;
        }

        setUrl(navigator.url);
        return true;
    }

    // Async getter for authetication
    SecureStore.getItemAsync('email').then((tokenEmail) => {
        SecureStore.getItemAsync('password').then((tokenPassword) => {
            INJECTED_JAVASCRIPT = `
            var emailElement = document.getElementById("user_login");
            var passwordElement = document.getElementById("user_password");
            emailElement.value = "${tokenEmail}";
            passwordElement.value = "${tokenPassword}";
            document.getElementById("new_user").submit();
            true;
            `;
            setJavascriptInjection(INJECTED_JAVASCRIPT);
        })
    })

    
    // Define Effects
    useEffect(() => {
        if (!(
            url === 'http://teste.maxia.education/users/sign_in' ||
            url === 'http://teste.maxia.education/'
        )) {
            setIsLoading(false);
        }
    }, [url]);

    // Only render main component when javascriptInjection is ready
    if (javascriptInjection === '') {
        return null
    }

    // Return component
    return (
        <>
            {isLoading && <Loading 
            style={{
                ...styles.container,
                height: dimensions.height,
                backgroundColor: '#f2f2f2'
            }}/>}
            <WebView 
                ref={webRef}
                visibility={isLoading ? 'gone':'visible'}
                style={styles.container}
                source={{ 
                    uri: url,
                    // Settar os cookies tbm funciona! No nativo (release) vai ser possível salvar os
                    // cookies na localStorage e passar direto por aqui
                    headers: {
                        // Limpar cookie de autenticação na abertura do WebView
                        Cookie: '_maxia_session="none"'
                    },
                }}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} //for iOS
                onNavigationStateChange ={onShouldStartLoadWithRequest} //for Android
                injectedJavaScript={javascriptInjection}
                javaScriptEnabled={true}
                sharedCookiesEnabled={true}
                onMessage={({data}) => {return data}}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: 'rgb(248, 249, 250)'
    }
});