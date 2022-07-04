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
        setUrl(navigator.url);
        // INTERCEPT PDFs
        if (navigator.url.slice(-4) === '.pdf') {
            webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            WebBrowser.openBrowserAsync(navigator.url)
            return false;
        }
    
        if (navigator.url === 'http://teste.maxia.education/users/sign_out') {
            webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            setUrl('http://teste.maxia.education/users/sign_in')
            setIsLoading(true);
            // navigation.navigate('Home');
            setAuth(false);
            save('maxiaSessionToken', '');
            save('email', '');
            save('password', '');
            return false;
        }

        // if (!isLoading && navigator.url === 'http://teste.maxia.education/users/sign_in') {
        //     webRef.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
        //     setIsLoading(true);
        //     setTimeout(() => {
        //         alert("Credenciais inválidas :(")
        //     }, 100);
        //     navigation.goBack();
            
        //     return false;
        // }

        return true;
    }

    const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "WebView" }]
    });

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
            // setTimeout(() => {
            //     setIsLoading(false);
            // }, 4000);
        // };
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
                style={{
                    ...styles.container,
                    display: isLoading ? 'none':'block'
                }}
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