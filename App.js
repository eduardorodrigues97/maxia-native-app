// https://github.com/eduardorodrigues97/maxia-native-app

import { React, useEffect, useState, useContext } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import { OrientationLock } from 'expo-screen-orientation';
import { useScreenOrientationLock } from '@use-expo/screen-orientation';
import { useFonts } from 'expo-font';
import { Asset } from 'expo-asset';

// Component imports
import OfflineScreen from './components/offline-screen';
import MyWebView from './components/web-view';
import LoginScreen from './components/login-screen';
import Splash from './components/transitionScreens/splash-screen';
import HomeScreen from './components/pages/home-screen';
import OtherScreen from './components/pages/other-screen';
import SettingsScreen from './components/pages/setting-screen';

// Images
import sadBot from './assets/sad-bot.png';
import infantil from './assets/home-screen/infantil.svg'
import Ionicons from 'react-native-vector-icons/Ionicons';


// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext, StateProvider } from './components/auth-context';


const Tab = createBottomTabNavigator();

const Main = () => {
    // Load Fonts
    const [loaded] = useFonts({
        Light: require('./assets/fonts/DINNextRoundedLTPro-Light.ttf'),
        Medium: require('./assets/fonts/DINNextRoundedLTPro-Medium.ttf'),
        Regular: require('./assets/fonts/DINNextRoundedLTPro-Regular.ttf'),
        Bold: require('./assets/fonts/DINNextRoundedLTPro-Bold.ttf'),
    });

    // Load background assets that can be loaded on background
    Asset.fromModule(sadBot).downloadAsync()
    Asset.fromModule(infantil).downloadAsync()
    
    // Lock screen rotation
    useScreenOrientationLock(OrientationLock.PORTRAIT_UP);

    // States
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth, setAuth] = useContext(AuthContext);

    // Get Net Info
    netInfo = useNetInfo();

    // Auth Checker
    const checkAuthentication = async (token) => {
        try {
            const response = await fetch('https://native-app-dev-7rbjwj4yoa-rj.a.run.app/check_authentication', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            });
            const json = await response.json();
            setIsAuthenticated(!json.status);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    // First run
    useEffect(() => {
        setTimeout(() => {
            checkAuthentication('my_token');
        }, 3500);
    }, []);

    // If the fonts are not yet loaded, return without rendering
    // if (!loaded) {
    //     return null;
    // }

    if (netInfo.isConnected === false){
        return OfflineScreen()
    }

    return (
        isLoading ?
        <Splash /> :
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        }
                        if (rn === 'Other') {
                            iconName = focused ? 'list' : 'list-outline';
                        }
                        if (rn === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }
                        if (rn === 'WebView') {
                            iconName = focused ? 'desktop' : 'desktop-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name = {iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'rgb(196, 196, 196)',
                    tabBarLabelStyle: { 
                        paddingBottom: 10,
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: 'Medium'
                    },
                    tabBarStyle: {
                        padding: 10,
                        height: 70,
                        borderTopEndRadius: 20,
                        borderTopStartRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        display: (!auth || route.name === 'WebView') ? 'none': 'block'
                    }
                })}
            >
                {/* Unauthenticated Screens */}
                {!auth &&
                    <Tab.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        animationTypeForReplace: 'pop', // : 'push',
                    }}
                    />
                }
                {/* Authenticated Screens */}
                {auth &&
                <>
                    <Tab.Screen name={'Home'} component={HomeScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={'Other'} component={OtherScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={'Settings'} component={SettingsScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={'WebView'} component={MyWebView} options={{headerShown: false}}/>
                </>
                }
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App = () => {
    return (
        <StateProvider>
            <Main />
        </StateProvider>
    )
}