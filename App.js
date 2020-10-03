import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from './Authentication_Screens/SignInScreen';
import SignUpScreen from './Authentication_Screens/SignUpScreen';
import ForgotPasswordScreen from './Authentication_Screens/ForgotPasswordScreen';
import MainContentScreen from "./screens/MainContentScreen";
import DrawerContent from "./screens/DrawerContent";
import { AuthContext, User } from "./components/context";
import { Root } from "native-base";
import firebase from "./Config/firebase";

const RootScreensStack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setuser] = useState({
    googleuser: null,
    facebookuser: null,
    anonymoususer: null,
    phone_user: null,
    new_user:null
  });

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken("nikhil");
      setIsLoading(false);
    },
    signOut: () => {
      try{
        setUserToken(null);
        setIsLoading(false);
        firebase.auth().signOut();
      }
      catch(error){
        console.log(error)
      }
    },
    signUp: () => {
      setUserToken("nikhil");
      setIsLoading(false);
    },
  }));

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <User.Provider value={[user, setuser]}>
        <Root>
          <NavigationContainer>
            {userToken != null ? (
              <>
              <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <DrawerContent {...props} />}
              >
                <Drawer.Screen name="HomeDrawer" component={MainContentScreen} />
                
              </Drawer.Navigator>
              </>
            ) : (
              <>
                <RootScreensStack.Navigator headerMode="none">
                  <RootScreensStack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                  />
                  <RootScreensStack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                  />
                  <RootScreensStack.Screen
                    name="ForgotPasswordScreen"
                    component={ForgotPasswordScreen}
                  />
                  
                </RootScreensStack.Navigator>
              </>
            )}
          </NavigationContainer>
        </Root>
      </User.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
