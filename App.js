// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useRef, useState } from 'react';
import { StyleSheet, Constants } from 'react-native';

// Component imports
// import Main from './components/main';
import { WebView } from 'react-native-webview';

// import { StateProvider } from './components/context';

export default App = () => {
    // Define refs
    const webRef = useRef(null);
    const [url, setUrl] = useState('http://teste.maxia.education/');

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
        <WebView 
            ref={webRef}
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
            // injectedJavaScript={javascriptInjection}
            // javaScriptEnabled={true}
            sharedCookiesEnabled={true}
            onMessage={({data}) => {return data}}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
        backgroundColor: 'rgb(248, 249, 250)'
    }
});