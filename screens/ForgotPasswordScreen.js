import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button,
  H1,
  Toast,
  Root,
} from "native-base";
import firebase from "../Config/firebase";
import { toastr_success_top } from "./toaster_success";
import { toastr_danger } from "./toaster_danger";
import { useFonts } from "expo-font";

const ForgotPasswordScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  const [email, setemail] = useState("");
  const [isvaliduser, setisvaliduser] = useState(false);

  const textInputChange = (value) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value).toLowerCase()) == true) {
      setemail(value.trim());
      setisvaliduser(true);
    } else {
      setemail(value.trim());
      setisvaliduser(false);
    }
  };

  const handlePasswordreset = async(email) =>{
    try {
        await firebase.auth().sendPasswordResetEmail(email)
        toastr_success_top.showToast('Password reset email sent successfully to your email')

        setTimeout( ()=>{
            Alert.alert('Info','Dear User, Now you will be getting the password reset link to your email.Please click the link and reset your password for your email :'+email)
            setTimeout( () =>  navigation.navigate('SignInScreen') , 1000)
        },1500)
       
      } catch (error) {
        console.log(error)
        toastr_danger.showToast('Failed to send Password Reset link to email : '+email)
      }
  }

  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <Root>
      <Container>
        <Header />
        <Content style={{ paddingHorizontal: 7 }}>
          <Form>
            <Text style={styles.textSign}>
              <H1>Forgot Password</H1>
            </Text>

            <Item floatingLabel last rounded >
              <Label style={styles.label}>Your Registered Email</Label>
              <Input
                placeholder="Your registered Email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(value) => textInputChange(value)}
              />
              <Icon
                name={isvaliduser ? "checkmark-circle" : null}
                style={styles.icon}
              />
            </Item>

            <Button
                  block
                  rounded
                  warning
                  onPress={() => {
                      if(isvaliduser)
                   handlePasswordreset(email)
                   else  toastr_danger.showToast('Email address is invalid!')
                  }}
                  style={styles.signIn}
                >
                  <Text
                    style={{ fontFamily: "sans-serif-condensed", fontSize: 20 }}
                  >
                    Send Mail
                  </Text>
                </Button>
          </Form>
        </Content>
      </Container>
    </Root>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 0,
    marginBottom: 10,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : 16,
    paddingHorizontal: 5,
    marginHorizontal: 13,
    color: "#05375a",
    fontFamily: "sans-serif-condensed",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    marginTop: 30,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif-condensed",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "sans-serif-condensed",
    textAlign: "center",
    marginTop: 10,
  },
  label: {
    marginLeft: 19,
    marginBottom: 20,
    fontFamily: "sans-serif-condensed",
  },
});
export default ForgotPasswordScreen;
