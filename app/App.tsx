import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
// import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileSettingsScreen from './screens/ProfileSettingsScreen';
import Index from './index';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
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
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Profile" component={ProfileSettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen options={{headerShown: false}} name="index" component={Index} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
        {/* <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} /> */}
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
