import React, { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { Button } from "native-base";
import firebase from "../../Config/firebase";
import { useFonts } from "expo-font";
import { AuthContext, User } from "../../components/context";
import * as Google from "expo-google-app-auth";
import { AntDesign } from "@expo/vector-icons";

export default function GoogleLogin(props) {
  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  const { signIn } = React.useContext(AuthContext);
  const [user, setuser] = React.useContext(User);

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const onSignIn = (googleUser) => {
    // console.log('Google Auth Response', googleUser,'\n\n');
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        if (!isUserEqual(googleUser, firebaseUser)) {
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => {
              Alert.alert("Congo!", "Welcome " + googleUser.user.name);
              console.log(googleUser);
              signIn();
              setuser({
                ...user,
                googleuser: googleUser,
              });
              console.log(user,'google user')
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      });
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "516204578828-p626c5397337l66r3ojvbhn5v5s287lr.apps.googleusercontent.com",
        iosClientId:
          "516204578828-j2o1lj2sv2d469hobcf82t6mj3ci40go.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <Button
      block
      dark
      onPress={() => {
        firebase.auth().signOut();
        signInWithGoogleAsync();
      }}
      style={styles.btn}
    >
      <AntDesign
        name="google"
        size={37}
        color="white"
        style={{ marginRight: "8%" }}
      />
      <Text style={styles.btntxt}>Continue {"\n"} with Google</Text>
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
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: "48%",
    left: "3%",
    height: "100%",
  },
});
