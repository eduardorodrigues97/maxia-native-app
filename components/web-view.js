// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export default function MyWebView( { navigation } ) {
    // Define states
    const [url, setUrl] = useState('http://teste.maxia.education/users/sign_in');
    const [javascriptInjection, setJavascriptInjection] = useState('');

    // Define refs
    webRef = useRef(null);

    // URL change handler
    const onShouldStartLoadWithRequest = function(navigator) {
        // Set new URL to state
        setUrl(navigator.url);

        // INTERCEPT PDFs
        if (navigator.url.slice(-4) === '.pdf') {
            webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            WebBrowser.openBrowserAsync(navigator.url)
            return false;
        }
    
        if (navigator.url === 'http://teste.maxia.education/users/sign_out') {
            // webRef.current.injectJavaScrip(`
            
            // `)
            webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            setUrl('http://teste.maxia.education/users/sign_in')
            navigation.navigate('LoginScreen');
            return false;
        }

        return true;
    }

    let usersTable = {
        'eduardo.rodriguesn': 'senha'
    }

    SecureStore.getItemAsync('email').then((tokenEmail) => {
        SecureStore.getItemAsync('password').then((tokenPassword) => {
            //console.log(tokenEmail)
            //console.log(tokenPassword)
            if (tokenEmail in usersTable && usersTable[tokenEmail] === tokenPassword) {
                INJECTED_JAVASCRIPT = `
                var emailElement = document.getElementById("user_login");
                var passwordElement = document.getElementById("user_password");
                emailElement.value = "${tokenEmail}";
                passwordElement.value = "${tokenPassword}";
                document.getElementById("new_user").submit();
                true;
                `;
                setJavascriptInjection(INJECTED_JAVASCRIPT);
            }
            else {
                navigation.navigate("LoginScreen");
            }
        })
    })
    
    if (javascriptInjection === '') {
        return null
    }

    // Return component
    return (
        <WebView 
            ref={webRef}
            style={{
                ...styles.container,
                display: (
                    url==='http://teste.maxia.education/users/sign_in' ||
                    url==='http://teste.maxia.education/'
                ) ? 'none':'block'}}
            source={{ 
                uri: url,
                // Settar os cookies tbm funciona! No nativo (release) vai ser possível salvar os
                // cookies na localStorage e passar direto por aqui
                headers: {
                    // Limpar cookie de autenticação na abertura do WebView
                    Cookie: '_maxia_session="none"'
                    //Cookie: `_maxia_session=YNPO%2BMuARPrtKtXUWc7gy2l3yAKJ3tBKLP8CFREq2brwQVzfFGMdrRzLcFbcbKb5deDsoPX9bMFrZob0EXBfXukoB%2B9BtjaIOTI0crGdmuXim9qalbaPCIkt74uBccWXOUp0QlVjEEecXa68KGOiDalG0vCUM7YM1E62WM7zUZDzquFFayPwCMg4isXzkXZCwIx1Avz18SYH6269kyu4QW4t1WYnIrGbwtoU0%2BAkigb7GFM73Yqmk2nZasuRy2DDhC7%2BFahxPWB1KI5Z6wbzmaMO0ZHbY%2Fgzp2DhCKGjLA0SkOborvbIWBdJTDqsTqWjjOjZMHstx67AwE%2BqtQ9udjbpUYhEXGSySgigbm3RPhnaZ3pDsTDvxlUW3XaZ6qdGdjOp7A1qtbTVTprb8G9YrfcdivAxz1yxv7nKTWFfwKAANjIGln95%2FTPk3H1gF3%2BkMu2r9LL%2FulWJLA%3D%3D--5G4nm7Peeq7VQJzo--nlQNoxBN0FmdSfrIjUdgNw%3D%3D`
                },
            }}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} //for iOS
            onNavigationStateChange ={onShouldStartLoadWithRequest} //for Android
            injectedJavaScript={javascriptInjection}
            javaScriptEnabled={true}
            sharedCookiesEnabled={true}
            onMessage={({data}) => {return data}}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    }
});