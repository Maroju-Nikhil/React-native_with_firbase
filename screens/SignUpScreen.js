import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
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
  Picker,
  H1,
  DatePicker,
  Root,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../components/context";
import firebase from "../Config/firebase";
import { useFonts } from "expo-font";
import { toastr_success } from "./toaster_success";
import { toastr_danger } from "./toaster_danger";

const SignUpScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  const [data, setData] = useState({
    name: "",
    chosenDate: new Date(),
    pin: "",
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: false,
    isValidUser: false,
    isValidpassword: false,
    pickerSelected: "",
    Pickervalue: "",
    address: "",
    issignedup: false,
  });

  const setDate = (newdate) => {
    setData({
      ...data,
      chosenDate: newdate,
    });
  };

  const setPicker = (value) => {
    setData({
      ...data,
      Pickervalue: value,
      pickerSelected: value,
    });
  };

  const setAddress = (value) => {
    setData({
      ...data,
      address: value,
    });
  };

  const nameInputChange = (value) => {
    setData({
      ...data,
      name: value,
    });
  };
  const { signUp } = React.useContext(AuthContext);

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

  const PinInputChange = (value) => {
    setData({
      ...data,
      pin: value,
    });
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

  const handleConfirmPasswordChange = (value) => {
    if (data.confirm_password >= 8) {
      setData({
        ...data,
        confirm_password: value,
        isConfirmPasword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isConfirmPasword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateconfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
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

  const signup = () => {
    if (data.email.trim().length == 0 || data.password.trim().length == 0)
      alert("Invalid Details");
    else if (!data.isValidUser)
      toastr_danger.showToast("Email Adress is invalid!");
    else if (!data.isValidpassword)
      toastr_danger.showToast("Password should be minimum of 8 characters");
    else if (data.isValidpassword && data.isValidUser) {
      Alert.alert('Loading..','Please wait while we regsiter you..')
      const db = firebase.firestore();
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else if (errorCode == "auth/email-already-in-use") {
            alert("You are already registered \nTry to Sign In Now");
            navigation.goBack();
          }
        })
        .then(function () {
          db.collection("Student-App").add({
            name: data.name,
            pin: data.pin,
            DOB: data.chosenDate,
            gender: data.Pickervalue,
            address: data.address,
          });
          setData({
            ...data,
            issignedup: true,
          })
            toastr_success.showToast("Registered succesfully");
            signUp();
            
            console.log(data.issignedup);
            // console.ignoredYellowBox = ['Setting a timer'];
        });
    }
  };
  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <Root>
      <View style={styles.container}>
        <Container>
          <Header />
          <Content style={{ paddingHorizontal: 8 }}>
            <Form>
              <Text style={styles.textSign}>
                <H1>Register Here</H1>
              </Text>
              <Item floatingLabel last rounded>
                <Label style={styles.label}>Name</Label>
                <Input
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(value) => nameInputChange(value)}
                />
              </Item>

              <Item floatingLabel last rounded>
                <Label style={styles.label}>Pin Number</Label>
                <Input
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(value) => PinInputChange(value)}
                />
              </Item>

              <Item last rounded style={{ marginTop: 15 }}>
                <Label style={styles.label}>Date of Birth :</Label>
                <DatePicker
                  defaultDate={new Date(2020, 9, 9)}
                  minimumDate={new Date(1950, 1, 1)}
                  maximumDate={Date.now()}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Click Here"
                  textStyle={{
                    color: "green",
                    fontFamily: "sans-serif-condensed",
                    fontSize: 18,
                    marginBottom: 20,
                    fontWeight: "bold",
                  }}
                  placeHolderTextStyle={{
                    color: "#000",
                    fontFamily: "sans-serif-condensed",
                    fontWeight: "bold",
                    marginBottom: 18,
                  }}
                  onDateChange={(val) => setDate(val)}
                  disabled={false}
                />
              </Item>

              <Item floatingLabel last rounded>
                <Label style={styles.label}>Email</Label>
                <Input
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(value) => textInputChange(value)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                <Icon
                  name={data.isValidUser ? "checkmark-circle" : null}
                  style={styles.icon}
                />
              </Item>

              <Item floatingLabel last rounded>
                <Label style={styles.label}>Password</Label>
                <Input
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(value) => handlePasswordChange(value)}
                />
                <Icon
                  name={data.secureTextEntry ? "eye-off" : "eye"}
                  style={styles.icon}
                  onPress={updateSecureTextEntry}
                />
                <Icon
                  name={data.isValidpassword ? "checkmark-circle" : null}
                  style={{ marginBottom: 10, marginRight: 5 }}
                />
              </Item>

              <Item last rounded style={{ marginTop: 15 }}>
                <Label style={styles.label}>Gender :</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  headerStyle={{ backgroundColor: "#b95dd3" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={data.pickerSelected}
                  onValueChange={(val) => setPicker(val)}
                  itemStyle={styles.label}
                  itemTextStyle={styles.label}
                  style={styles.label}
                >
                  <Picker.Item label="male" value="male" />
                  <Picker.Item label="female" value="female" />
                  <Picker.Item label="other" value="other" />
                </Picker>
              </Item>

              <Item rounded floatingLabel last>
                <Label style={styles.label}>Address</Label>
                <Input
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setAddress(value);
                  }}
                  multiline={true}
                />
              </Item>

              <Button
                block
                rounded
                success
                style={styles.signIn}
                onPress={() => {
                  signup();
                }}
              >
                <Text style={styles.textSign}>Register</Text>
              </Button>

              <Button
                rounded
                info
                block
                onPress={() => navigation.goBack()}
                style={{ marginBottom: 20, marginTop : 15 }}
              >
                <Text style={styles.textSign}>Go Back</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.8,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  label: {
    marginLeft: 19,
    marginBottom: 20,
    fontFamily: "sans-serif-condensed",
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
    marginTop: 30,
  },
  signIn: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "sans-serif-condensed",
    textAlign: "center",
    marginTop: 5,
    padding: 8,
  },
});

export default SignUpScreen;
