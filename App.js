// https://github.com/eduardorodrigues97/maxia-native-app

import { React } from 'react';

// Component imports
import Main from './components/main';

import { StateProvider } from './components/auth-context';

export default App = () => {
    return (
        <StateProvider>
            <Main />
        </StateProvider>
    )
}