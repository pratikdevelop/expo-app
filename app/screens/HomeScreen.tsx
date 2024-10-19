// screens/HomeScreen.js
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PasswordScreen from "./PasswordScreen";
import NotesScreen from "./NotesScreen";
import CardScreen from "./CardScreen";
import FileScreen from "./FileScreen";

const HomeScreen = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Passwords"
      
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <Drawer.Screen 
      navigationKey="password"
      
      name="Passwords" component={PasswordScreen} />
      <Drawer.Screen name="Notes" component={NotesScreen} />
      <Drawer.Screen name="Card" component={CardScreen} />
      <Drawer.Screen name="File Management" component={FileScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
