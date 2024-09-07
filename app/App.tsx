import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileSettingsScreen from './screens/ProfileSettingsScreen';
import Index from './index';
import MFAVerificationScreen from './screens/MFAVerificationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function indexTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route}) => ({
        tabBarIcon: ({ color, size }:{}
        ) => {
          let iconName="";
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
     
    >
      <Tab.Screen options={{
        headerShown: false
      }} name="Home" component={HomeScreen} />

      <Tab.Screen name="Profile" component={ProfileSettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (token) {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="index">
          <Stack.Screen options={{headerShown: false}} name="index" component={indexTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown: false}} name="MFAVerification" component={MFAVerificationScreen} />
        </Stack.Navigator>
        
      </NavigationContainer>
    );
  }
}