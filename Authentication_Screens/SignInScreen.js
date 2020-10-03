import React, { useState, useRef, useEffect } from "react";
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
  H2,
  Toast,
  Root,
  Body
} from "native-base";
import { AuthContext, User } from "../components/context";
import firebase from "../Config/firebase";
import { toastr_success_top } from '../Toasters/toaster_success'
import { toastr_danger } from '../Toasters/toaster_danger'
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useFonts } from "expo-font";
import FacebookLogin from './More_Logins/Facebooklogin';
import GoogleLogin from './More_Logins/Googlelogin';
import { StatusBar } from 'expo-status-bar';

const SignInScreen = ({ navigation }) => {
  const [activity, setactivity] = useState(false);

  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidpassword: true,
    phone: "+91",
    isvalidphone: false,
    isvalidotp: false,
  });

  const [isphone, setIsPhone] = useState(false);

  const handlephonechange = (value) => {
    if (value.trim().length == 0 || value.trim().length < 10){
      setData({
        ...data,
        phone: "+91" + value,
        isvalidphone: false,
      });
      setphone_user({
        ...phone_user,
        phone_no:value.trim()
      })
    }
    else if (value.trim().length == 10) {
      setData({
        ...data,
        phone: "+91" + value,
        isvalidphone: true,
      });
      setphone_user({
        ...phone_user,
        phone_no:value.trim()
      })
      Keyboard.dismiss();
    }
  };

  const handleOTPchange = (value) => {
    if (value.trim().length < 6)
      setData({
        ...data,
        isvalidotp: false,
      });
    else
      setData({
        ...data,
        isvalidotp: true,
      });
  };
  const [otpinput, setotpinput] = useState(false);

  const handleValidPhone = (value) => {
    if (value.trim().length < 10 && phone_user_name == null) {
      setData({
        ...data,
        phone: "+91" + value.trim(),
        isvalidphone: false,
      });
      setphone_user({
        ...phone_user,
        phone_no:value.trim()
      })
      setIsPhone(false);
    } else if (value.trim().length == 10 && phone_user_name != null) {
      setData({
        ...data,
        phone: "+91" + value.trim(),
        isvalidphone: true,
      });
      setphone_user({
        ...phone_user,
        phone_no:value.trim()
      })
      setIsPhone(true);
      
    }
  };

  //phone authentication here

  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(data.phone, recaptchaVerifier.current)
      .then(function (e) {
        setVerificationId(e);
        toastr_success_top.showToast("Otp sent to " + data.phone);
      })
      .catch(function (error) {
        console.log(error);
        setotpinput(false);
        toastr_danger.showToast("Failed to send otp to " + data.phone);
      });
  };

  const { signIn } = React.useContext(AuthContext);
  const [user, setuser] = React.useContext(User);

  const getuser = (email, user_phone) => {
    const db = firebase.firestore();
    return db.collection("Student-App").onSnapshot((snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push({
          ...doc.data(),
        });
        if (email != null) {
          if (doc.data().email.toString() == email.toString()) {
            setuser({
              ...user,
              anonymoususer: doc.data(),
            });
            console.log(doc.data())
          }
        }

        if (user_phone != null) {
            setuser({
              ...user,
              phone_user : user_phone,
            });
        }
      });
    });
  };

  function handleValidOTP(value) {
    if (value.trim().length < 6) {
      setData({
        ...data,
        isvalidotp: false,
      });
      setCode(value.trim());
    } else {
      setData({
        ...data,
        isvalidotp: true,
      });
      setCode(value.trim());
    }
  }

  const textInputChange = (value) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value).toLowerCase()) == true) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidpassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidpassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (value) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value).toLowerCase()) == true) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const [phone_user, setphone_user] = useState({
      user_name:'',
      phone_no:''
  })

  const signin1 = () => {
    if (data.email.trim().length == 0 || data.password.trim().length == 0)
      alert("Invalid Details");
    else if (!data.isValidpassword)
      toastr_danger.showToast("Password should be minimum of 8 characters");
    else if (!data.isValidUser)
      toastr_danger.showToast("Email Address is invalid!");
    else {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(function() {
          getuser(data.email,null);
          signIn();
        })
        .catch(function (error) {
          Alert.alert(
            "Failed",
            "It looks like You Don't have account\nPlease try to Regsiter now"
          );
          console.log(error);
          navigation.navigate("SignUpScreen");
        });
    }
  };

  const signin2 = () => {
    if (!data.isvalidotp && !data.isvalidphone) alert("Invalid Details");
    else {
      // Function to be called when confirming the verification code that we received
      // from Firebase via SMS
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          console.log(result);
          getuser(null,phone_user);
          console.log(result)
          signIn();
        })
        .catch(function (error) {
          Alert.alert("failed", "Something went wrong \nPlease try again");
          console.log(error);
        });
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }
  return (
    <Root>
      <View style={styles.container}>
      <Header style={{backgroundColor:'#fff'}} />
        <Container>
        <StatusBar hidden={true}/>
          <Content style={{ paddingHorizontal: '7%' }}>
            {!isphone ? (
              <Form key="key1">
                <Text style={styles.textSign}>
                  <H1>Crimson Innovative Technologies</H1>
                </Text>
                {data.isValidUser ? (
                  <Item floatingLabel last rounded success>
                    <Label style={styles.label}>Email</Label>
                    <Input
                      placeholder="Your Email"
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(value) => textInputChange(value)}
                      onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    <Icon name="checkmark-circle" style={styles.icon} />
                  </Item>
                ) : (
                  <Item floatingLabel last rounded error>
                    <Label style={styles.label}>Email</Label>
                    <Input
                      placeholder="Your Email"
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(value) => textInputChange(value)}
                      onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    <Icon name="close-circle" style={styles.icon} />
                  </Item>
                )}
                {data.isValidpassword ? (
                  <Item floatingLabel last rounded success>
                    <Label style={styles.label}>Password</Label>
                    <Input
                      secureTextEntry={data.secureTextEntry ? true : false}
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(value) => handlePasswordChange(value)}
                    />
                    <Icon name="checkmark-circle" style={styles.icon} />
                  </Item>
                ) : (
                  <Item floatingLabel last rounded error>
                    <Label style={styles.label}>Password</Label>
                    <Input
                      textContentType="password"
                      secureTextEntry={data.secureTextEntry ? true : false}
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(value) => handlePasswordChange(value)}
                    />
                    <Icon name="close-circle" style={styles.icon} />
                  </Item>
                )}
                <Button
                  block
                  rounded
                  success
                  onPress={() => {
                    signin1();
                  }}
                  style={styles.signIn}
                >
                  <Text
                    style={{ fontFamily: "sans-serif-condensed", fontSize: 17 }}
                  >
                    Sign In
                  </Text>
                </Button>

                <Item>
                  <Button
                    transparent
                    style={[styles.signIn, { marginBottom: 5, marginTop: 0 }]}
                    onPress={() => navigation.navigate("ForgotPasswordScreen")}
                  >
                    <Text
                      style={{
                        fontFamily: "sans-serif-condensed",
                        fontSize: 17,
                      }}
                    >
                      Forgot password?
                    </Text>
                  </Button>
                </Item>

                <Button
                  block
                  rounded
                  success
                  bordered
                  onPress={() => {
                    setIsPhone(true);
                  }}
                  style={{ marginBottom: 18 }}
                >
                  <Icon name="ios-call" />
                  <Text
                    style={{
                      fontFamily: "sans-serif-condensed",
                      fontSize: 17,
                      color: "green",
                    }}
                  >
                    Sign In with Phone Number Instead
                  </Text>
                </Button>
              </Form>
            ) : (
              <Form key="form2">
                <Text style={styles.textSign}>
                  <H1>Login with Phone</H1>
                </Text>

                <FirebaseRecaptchaVerifierModal
                  ref={recaptchaVerifier}
                  firebaseConfig={firebase.app().options}
                />

                <Item floatingLabel last rounded>
                  <Label style={styles.label}>Your Name</Label>
                  <Input
                    style={styles.textInput}
                    onChangeText={(value) => setphone_user({
                      ...phone_user,
                      user_name:value
                    })}
                  />
                </Item>

                <Item floatingLabel last rounded>
                  <Label style={styles.label}>Phone Number</Label>
                  <Input
                    style={styles.textInput}
                    onChangeText={(value) => handlephonechange(value)}
                    onEndEditing={(e) => {
                      handleValidPhone(e.nativeEvent.text);
                    }}
                    keyboardType={"numeric"}
                    maxLength={10}
                  />
                  <Icon name={data.isvalidphone ? "checkmark-circle" : null} />
                </Item>

                {otpinput ? (
                  <Form>
                    <Item floatingLabel last rounded>
                      <Label style={styles.label}>OTP Number</Label>
                      <Input
                        style={styles.textInput}
                        onChangeText={(value) => {
                          setCode(value);
                          handleOTPchange(value);
                        }}
                        onEndEditing={(val) => handleValidOTP(val)}
                        keyboardType={"numeric"}
                        maxLength={6}
                      />
                    </Item>
                    <Button
                      block
                      rounded
                      success
                      onPress={() => {
                        setotpinput(false);
                        signin2();
                      }}
                      style={styles.signIn}
                    >
                      <Text
                        style={{
                          fontFamily: "sans-serif-condensed",
                          fontSize: 20,
                          color: "#fff",
                        }}
                      >
                        Sign In Now
                      </Text>
                    </Button>
                  </Form>
                ) : null}

                <Button
                  block
                  rounded
                  success
                  onPress={() => {
                    if (data.isvalidphone) {
                      setotpinput(true);
                      sendVerification();
                    } else if (phone_user_name == null)
                      toastr_danger.showToast("Name can't be empty");
                    else toastr_danger.showToast("Invalid number");
                  }}
                  style={styles.signIn}
                >
                  <Text
                    style={{ fontFamily: "sans-serif-condensed", fontSize: 19 }}
                  >
                    Send OTP
                  </Text>
                </Button>

                <Button
                  block
                  rounded
                  info
                  onPress={() => {
                    setIsPhone(false);
                    setotpinput(false);
                  }}
                  style={{ marginVertical: 10, marginBottom: 20 }}
                >
                  <Text
                    style={{ fontFamily: "sans-serif-condensed", fontSize: 17 }}
                  >
                    Sign In with Email
                  </Text>
                </Button>
              </Form>
            )}

            <View style={{ flexDirection: "row", marginBottom: "5%" }}>
              <FacebookLogin />
              <GoogleLogin />
            </View>

            <Button
              block
              rounded
              bordered
              onPress={() => {
                navigation.navigate("SignUpScreen");
                setotpinput(false);
              }}
            >
              <Text
                style={{
                  fontFamily: "sans-serif-condensed",
                  fontSize: 17,
                  color: "darkblue",
                }}
              >
                Create Account
              </Text>
            </Button>
          </Content>
        </Container>
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "sans-serif-condensed",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
    fontFamily: "sans-serif-condensed",
  },
  label: {
    marginLeft: 19,
    marginBottom: 20,
    fontFamily: "sans-serif-condensed",
  },
  body: {
    marginLeft: 150,
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "sans-serif-condensed",
  },
  icon: {
    marginTop: 0,
    marginBottom: 10,
    marginRight: 10,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "sans-serif-condensed",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    fontFamily: "sans-serif-condensed",
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
});

export default SignInScreen;
