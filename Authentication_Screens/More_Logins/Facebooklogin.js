import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { Button, Icon, Toast } from "native-base";
import firebase from '../../Config/firebase'
import { useFonts } from "expo-font";
import { AuthContext, User } from "../../components/context";
import * as Facebook from "expo-facebook";
import { Entypo } from "@expo/vector-icons";

export default function FacebookLogin() {
  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  const { signIn } = React.useContext(AuthContext);
  const [user, setuser] = React.useContext(User);

  const loginWithFacebook = async () => {
    await Facebook.initializeAsync({
      appId: "1783459828473583",
      appName: "React-Native Firebase ",
    });

    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email",'phone'],
      });

      if (type == "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            console.log(error, "error1");
          })
          .then(() => {
            firebase.auth().onAuthStateChanged((_user) => {
              if (_user != null) {
                Alert.alert("Congo!", "Welcome " + _user.displayName);
                signIn();
                console.log(_user);
                setuser({
                  ...user,
                  facebookuser: _user,
                });
                console.log(user)
              }
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <Button
      block
      onPress={() => {
        firebase.auth().signOut()
        loginWithFacebook();
      }}
      style={styles.btn}
    >
      <Entypo
        name="facebook-with-circle"
        size={37}
        color="white"
        style={{ marginLeft: "10%", marginRight: "10%" }}
      />
      <Text style={styles.btntxt}>Login with {"\n"} Facebook</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "sans-serif-condensed",
    justifyContent: "center",
  },
  btntxt: {
    fontFamily: "sans-serif-condensed",
    fontSize: 17,
    color: "#fff",
  },
  btn: {
    alignContent: "space-between",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    width: "49%",
    height: "100%",
  },
});
