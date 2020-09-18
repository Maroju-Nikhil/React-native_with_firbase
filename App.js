import React, { useState } from "react";
import { StyleSheet, Text, View,ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MainContentScreen from './screens/MainContentScreen';
import { AuthContext } from "./components/context";
import { Root } from "native-base";

const RootScreensStack = createStackNavigator();
const RootContentStack = createStackNavigator();

export default function App() {

  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authContext = React.useMemo(() => ({
    signIn : () => {
      setUserToken("nikhil");
      setIsLoading(false);
    },
    signOut: (val) => {
      if(val == 0){
      setUserToken(null);
      setIsLoading(false);
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
    <Root>
    <NavigationContainer>
      {userToken != null ? (
        <RootContentStack.Navigator headerMode="none">
          <RootContentStack.Screen name="MainContentScreen" component={MainContentScreen}/>
        </RootContentStack.Navigator>
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
        </RootScreensStack.Navigator>
        </>
      )}
    </NavigationContainer>
    </Root>
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
