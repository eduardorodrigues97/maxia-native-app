import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from './pages/home-screen';
import OtherScreen from './pages/other-screen';
import SettingsScreen from './pages/setting-screen';

const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={'Home'}
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
                display: (route.name === 'Settings') ? 'none': 'block'
            }
          })
        }
        >
        <Tab.Screen name={'Home'} component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name={'Other'} component={OtherScreen} options={{headerShown: false}}/>
        <Tab.Screen name={'Settings'} component={SettingsScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainApp;