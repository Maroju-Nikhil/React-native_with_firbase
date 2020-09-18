import React, { Component } from "react";
import {
    Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch,Root , ActionSheet
} from "native-base";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {AuthContext} from '../components/context';

var BUTTONS = [
  { text: "Sign Out", icon: "arrow-forward", iconColor: "#2c8ef4" },
  { text: "Close", icon: "close", iconColor: "red" },
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

// const { signOut } = useContext(AuthContext);

export default class ScrollViewScreen extends Component {

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
        <Header>
        <Left style={{ flex: 1,}}><Text style={styles.headertext}>Settings</Text></Left>
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
        <Content>
        <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "grey" }}>
                <Icon active name="settings" />
              </Button>
            </Left>
            <Body>
              <Text>Software Update</Text>
            </Body>
            <Right>
            <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>Airplane Mode</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>

          <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>Fiber Net</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text>Bluetooth</Text>
            </Body>
            <Right>
              <Text>On</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "green" }}>
                <FontAwesome name="mobile-phone" style={{color:'#fff',fontSize:25}}/>
              </Button>
            </Left>
            <Body>
              <Text>Mobile Data</Text>
            </Body>
            <Right>
            <Switch value={false} />
            </Right>
          </ListItem>

          <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "green" }}>
                <FontAwesome name="shield" style={{color:'#fff',fontSize:20}}/>
              </Button>
            </Left>
            <Body>
              <Text>Personal Hotstop</Text>
            </Body>
            <Right>
                <Text>Off</Text>
                <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem itemDivider>
              <Text></Text>
            </ListItem>

            <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "green" }}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Notifications</Text>
            </Body>
            <Right>
                <Text>Off</Text>
                <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "grey" }}>
                <FontAwesome name="headphones" style={{color:'#fff',fontSize:20}}/>
              </Button>
            </Left>
            <Body>
              <Text>Headphones</Text>
            </Body>
            <Right>
                <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "blue" }}>
                <Icon active name="moon" />
              </Button>
            </Left>
            <Body>
              <Text>Do Not Disturb</Text>
            </Body>
            <Right>
                <Text>Yes</Text>
            </Right>
          </ListItem>

          <ListItem itemDivider>
              <Text></Text>
            </ListItem>

            <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "brown" }}>
                <FontAwesome name="simplybuilt" style={{color:'#fff',fontSize:17}}/>
              </Button>
            </Left>
            <Body>
              <Text>Pick Sim</Text>
            </Body>
            <Right>
            <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem icon style={styles.item}>
            <Left>
              <Button style={{ backgroundColor: "lightblue" }}>
                <Icon active name="hand" />
              </Button>
            </Left>
            <Body>
              <Text>Privacy</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </Content>
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
    textAlign:"center"
  },
  margin:{
      marginBottom:10,
  },
  headertext:{
      color:'#fff',
      fontFamily: "sans-serif-condensed",
      fontSize:25,
      fontWeight:'bold',
      marginRight:10
  },
  item:{
    marginBottom:10,
    marginTop:10
  }
});
