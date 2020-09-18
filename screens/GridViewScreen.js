import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Text,
  Root,
  Icon,
  ActionSheet,
  Button
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Font from "expo-font";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {AuthContext} from '../components/context';

var BUTTONS = [
  { text: "Sign Out", icon: "arrow-forward", iconColor: "#2c8ef4" },
  { text: "Close", icon: "close", iconColor: "red" },
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;


export default class GridViewScreen extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { loading: true,clicked:BUTTONS[0] };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <ActivityIndicator style={styles.container} size="large"/>
        </Root>
      );
    }

    const { signOut } = this.context

      return (
        <Root>
        <Container>
            <Header >
            <Left style={{ flex: 1,}}><Text style={styles.headertext}>Contacts</Text></Left>
            <Body style={{ flex: 1,}}></Body>
            <Right style={{flex: 1,}}><Button
              transparent
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: "More options",
                  },
                  (buttonIndex) => {
                    signOut(buttonIndex)
                  }
                )
              }
            >
              <Icon
                name="more"
                style={{ marginRight: 20 }}
                style={styles.headertext}
              />
            </Button></Right>
            </Header>
            <ScrollView>
            <Grid>
             <Row>
          <Col style={{ backgroundColor: "#25274D", height: 300 ,width:150 ,borderWidth:1,borderColor:'#fff'}}><Text style={styles.text}>C</Text></Col>
          <Col style={{backgroundColor:"#fff" , width:1}}></Col>
          <Col style={{ backgroundColor: "#2E9CCA", height: 300,borderWidth:1,borderColor:'#fff' }}><Text style={styles.text}>R</Text></Col>
          </Row>

          <Row>
          <Col style={{ backgroundColor: "#AAABBB", height: 300 , width:200 ,borderWidth:1,borderColor:'#fff'}}><Text style={styles.text}>S</Text></Col>
          <Col style={{ backgroundColor: "#464866", height: 300 ,borderWidth:1,borderColor:'#fff'}}><Text style={styles.text}>A</Text></Col>
          </Row>

            <Row>
            <Col style={{ backgroundColor: "#2E9CCA", height: 250 ,borderWidth:1,borderColor:'#fff'}}><Text style={styles.text}>J</Text></Col>
            <Col style={{ backgroundColor: "#29648A", height: 250 ,borderWidth:1,borderColor:'#fff'}}><Text style={styles.text}>N</Text></Col>
            </Row>

            <Row>
            <Col style={{ backgroundColor: "#AAABBB", height: 350 ,borderWidth:1,borderColor:'#fff'}}><Text style={styles.text}>H</Text></Col>
            <Col style={{ backgroundColor: "#25274D", height: 350 , width:160,borderWidth:1,borderColor:'#fff'}}><Text style={styles.text}>P</Text></Col>
            </Row>

        </Grid>
        </ScrollView>
        </Container>
        </Root>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text:{
    color:'#fff',
    textAlign:'center',
    justifyContent:'center',
    flex:1,
    textAlignVertical: 'center',
    fontFamily: "sans-serif-condensed",
    fontSize:60,
    fontWeight:'bold'
  },
  headertext:{
    color:'#fff',
    fontFamily: "sans-serif-condensed",
    fontSize:25,
    fontWeight:'bold',
    marginRight:10
}
});
