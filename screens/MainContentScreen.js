import React from "react";
import { useFonts } from "expo-font";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  Foundation,
  MaterialIcons,
} from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';

import { ActivityIndicator, StyleSheet } from "react-native";
import ListViewScreen from '../Screen_Components/ListViewScreen'
import GridViewScreen from '../Screen_Components/GridViewScreen';
import CardViewScreen from '../Screen_Components/CardViewScreen';
import ScrollViewScreen from '../Screen_Components/ScrollViewScreen';
import ModalViewScreen from '../Screen_Components/ModalViewScreen';
import { View } from "native-base";

const ListViewStack = createStackNavigator();
const GridViewStack = createStackNavigator();
const CardViewStack = createStackNavigator();
const ModalViewStack = createStackNavigator();
const ScrollViewStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function MainContentScreen() {
  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <View style={{flex:1}}>
    <StatusBar style="light"/>
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#ffffff"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Tab.Screen
        name="Home"
        component={CardViewStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#009387",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="#fff" />
          ),
        }}
      />
      <Tab.Screen
        name="Chat Room"
        component={ListViewStackScreen}
        options={{
          tabBarLabel: "Chat Room",
          tabBarColor: "#009387",
          tabBarIcon: () => <Entypo name="chat" size={24} color="#fff" />,
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={GridViewStackScreen}
        options={{
          tabBarLabel: "Contacts",
          tabBarColor: "#009387",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="contacts" size={24} color="#fff" />
          ),
        }}
      />
      <Tab.Screen
        name="Goals"
        component={ModalViewStackScreen}
        options={{
          tabBarLabel: "Goals",
          tabBarColor: "#009387",
          tabBarIcon: () => (
            <Foundation name="clipboard-notes" size={24} color="#fff" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ScrollViewStackScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarColor: "#009387",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="settings" color="#fff" size={24} />
          ),
        }}
      />
    </Tab.Navigator>
    </View>
  );
}

const ListViewStackScreen = ({ navigation }) => {
  return (
    <ListViewStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#009387" },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "sans-serif-condensed",
        },
      }}
    >
      <ListViewStack.Screen
        name="Chat Room"
        component={ListViewScreen}
        options={{
          headerLeft: () => (
            <Entypo
              name="menu"
              size={24}
              color="white"
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </ListViewStack.Navigator>
  );
};

const GridViewStackScreen = ({ navigation }) => {
  return (
    <GridViewStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#009387" },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "sans-serif-condensed",
        },
      }}
    >
      <GridViewStack.Screen
        name="Contacts"
        component={GridViewScreen}
        options={{
          headerLeft: () => (
            <Entypo
              name="menu"
              size={24}
              color="white"
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </GridViewStack.Navigator>
  );
};

const CardViewStackScreen = ({ navigation }) => {
  return (
    <CardViewStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#009387" },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "sans-serif-condensed",
        },
      }}
    >
      <CardViewStack.Screen
        name="Home"
        component={CardViewScreen}
        options={{
          headerLeft: () => (
            <Entypo
              name="menu"
              size={24}
              color="white"
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </CardViewStack.Navigator>
  );
};

const ModalViewStackScreen = ({ navigation }) => {
  return (
    <ModalViewStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#009387" },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "sans-serif-condensed",
        },
      }}
    >
      <ModalViewStack.Screen
        name="Goals"
        component={ModalViewScreen}
        options={{
          headerLeft: () => (
            <Entypo
              name="menu"
              size={24}
              color="white"
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </ModalViewStack.Navigator>
  );
};

const ScrollViewStackScreen = ({ navigation }) => {
  return (
    <ScrollViewStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#009387" },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "sans-serif-condensed",
        },
      }}
    >
      <ScrollViewStack.Screen
        name="Settings"
        component={ScrollViewScreen}
        options={{
          headerLeft: () => (
            <Entypo
              name="menu"
              size={24}
              color="white"
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </ScrollViewStack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "sans-serif-condensed",
    justifyContent: "center",
  },
});
