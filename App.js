// https://github.com/eduardorodrigues97/maxia-native-app

import { React } from 'react';

// Component imports
import Main from './components/main';

// Global Context
import { StateProvider } from './components/context';
import { Provider } from 'react-native-paper';

// Global Stylesheet building
import EStyleSheet from 'react-native-extended-stylesheet';
import { styles } from './assets/styles/general'

EStyleSheet.build({
    // GLobal variables
    $colors: styles.colors,
    $fonts: styles.fonts,
    $metrics: styles.metrics
});

export default App = () => {
    return (
        <StateProvider>
            <Provider>
                <Main />
            </Provider>
        </StateProvider>
    )
}