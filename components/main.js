
// https://github.com/eduardorodrigues97/maxia-native-app

import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import { OrientationLock } from 'expo-screen-orientation';
import { useScreenOrientationLock } from '@use-expo/screen-orientation';
import { useFonts } from 'expo-font';
import { Asset } from 'expo-asset';
import * as SecureStore from 'expo-secure-store';

// Component imports
import OfflineScreen from './offline-screen';
import MyWebView from './web-view';
import LoginScreen from './login-screen';
import Splash from './transitionScreens/splash-screen';
import HomeScreen from './pages/home-screen';
import SettingsScreen from './pages/setting-screen';
import {Avaliacoes} from './centralAvaliacoesNavigator/avaliacoes';

// Images
import sadBot from '../assets/sad-bot.png';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Context } from './context';


const Tab = createBottomTabNavigator();


export default Main = () => {
    // Load Fonts
    const [loaded] = useFonts({
        Light: require('../assets/fonts/DINNextRoundedLTPro-Light.ttf'),
        Medium: require('../assets/fonts/DINNextRoundedLTPro-Medium.ttf'),
        Regular: require('../assets/fonts/DINNextRoundedLTPro-Regular.ttf'),
        Bold: require('../assets/fonts/DINNextRoundedLTPro-Bold.ttf'),
    });

    // Load background assets that can be loaded on background
    Asset.fromModule(sadBot).downloadAsync()
    
    // Lock screen rotation
    useScreenOrientationLock(OrientationLock.PORTRAIT_UP);
    
    // States
    const [isLoading, setIsLoading] = useState(true);
    const { authState, navigatorState } = useContext(Context);
    const [auth, setAuth] = authState;
    const [navigator, setNavigator] = navigatorState;

    // Get Net Info
    let netInfo = useNetInfo();

    // Auth Checker
    const checkAuthentication = async () => {
        try {
            let token = await SecureStore.getItemAsync('maxiaSessionToken');
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
            setAuth(json.status);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    // First run
    useEffect(() => {
        setTimeout(() => {
            checkAuthentication();
        }, 3500);
    }, []);

    // If the fonts are not yet loaded, return without rendering
    if (!loaded) {
        return null;
    }

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
                        if (rn === 'Avaliacoes') {
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
                        fontFamily: 'Medium',
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
                        display: (!auth || ['WebView'].includes(route.name)) ? 'none': 'block'
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
                {/* Main App Screens */}
                {auth && navigator === 'main' &&
                <>
                    <Tab.Screen name={'Home'} component={HomeScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={'Settings'} component={SettingsScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={'WebView'} component={MyWebView} options={{headerShown: false}}/>
                    
                </>
                }
                {/* Central de Avaliações */}
                {auth && navigator === 'avaliacoes' &&
                <>
                    <Tab.Screen name={'Avaliacoes'} component={Avaliacoes} options={{headerShown: false}}/>
                </>
                }
            </Tab.Navigator>
        </NavigationContainer>
    )
}