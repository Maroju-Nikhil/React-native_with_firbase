import React from "react";
import { View, Text, ActivityIndicator, StyleSheet,Alert } from "react-native";
import { Button ,Icon,Toast} from "native-base";
import firebase from "../Config/firebase";
import { useFonts } from "expo-font";
import { AuthContext } from "../components/context";
import * as Facebook  from "expo-facebook";
import { Entypo } from '@expo/vector-icons';

export default function FacebookLogin() {
  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  const { signIn } = React.useContext(AuthContext);

  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync( '1783459828473583','React-Native Firebase ' );

      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "1783459828473583",
        {
          permissions: ["public_profile",'email','phone'],
        }
      );

      if (type == "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            console.log(error, "error1");
          })
          .then( () => {
              firebase.auth().onAuthStateChanged( async(user) =>{
                  if(user != null){
                    console.log(user)
                  await Alert.alert('Congo!', 'Welcome ' + user.displayName)
                   signIn()
                  }
              })
          })
      }
    } catch (error) {
      console.log(error, "error2");
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
    <Entypo name="facebook-with-circle" size={37} color="white" style={{marginLeft:'10%',marginRight:'10%'}}/>
      <Text
        style={styles.btntxt}
      >
        Login  with {'\n'} Facebook
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "sans-serif-condensed",
    justifyContent: "center",
  },
  btntxt:{
        fontFamily: "sans-serif-condensed",
        fontSize: 17,
        color: "#fff",
  },
  btn:{
      alignContent:'space-between',
      borderTopLeftRadius:25,
      borderBottomLeftRadius:25,
      width:'49%',
      height:'100%'
  }
});
