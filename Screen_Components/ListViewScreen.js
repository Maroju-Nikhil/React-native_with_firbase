import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Root,
  Icon,
  ActionSheet,
  Button,
  Drawer,
} from "native-base";
import { useFonts } from "expo-font";
import { ActivityIndicator, StyleSheet } from "react-native";
import { User, AuthContext } from "../components/context";
import { toastr_success_top } from "../Toasters/toaster_success";
import { StatusBar } from 'expo-status-bar';

const BUTTONS = [
  { text: "Sign Out", icon: "arrow-forward", iconColor: "#2c8ef4" },
  { text: "Close", icon: "close", iconColor: "red" },
];
let DESTRUCTIVE_INDEX = 0;
let CANCEL_INDEX = 1;

export default function ListViewScreen(props) {
  const { signOut } = useContext(AuthContext);
  const [user, setuser] = useContext(User);

  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });


  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }
  return (
    <Root>
      <Container>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRc96kcLicYy25CFi7P_ocMargwSC_vjRxIMg&usqp=CAU",
                  }}
                />
              </Left>
              <Body>
                <Text>Enosh Kumar</Text>
                <Text note>How's your day? My day went well..</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>

            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
                  }}
                />
              </Left>
              <Body>
                <Text>Idur Bhasa</Text>
                <Text note>Did you complete your work ?..</Text>
              </Body>
              <Right>
                <Text note>5:45 pm</Text>
              </Right>
            </ListItem>

            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQODjJzDNZkooTebpMO2HVyVIZJs2GeHUdllA&usqp=CAUL",
                  }}
                />
              </Left>
              <Body>
                <Text>Harika</Text>
                <Text note>
                  The short one but hm.. speaks good english bro.
                </Text>
              </Body>
              <Right>
                <Text note>3:00 am</Text>
              </Right>
            </ListItem>

            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSj8A36IZwHQFfLNrV9PuXoA9d68IPAIwungA&usqp=CAU",
                  }}
                />
              </Left>
              <Body>
                <Text>Akhil</Text>
                <Text note>
                  Looking handsome but it looks like you much have anger..
                </Text>
              </Body>
              <Right>
                <Text note>12:03 am</Text>
              </Right>
            </ListItem>

            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR31ej45MWVwNNHTncz88C0kOYMykdCnPTfDw&usqp=CAU",
                  }}
                />
              </Left>
              <Body>
                <Text>Abijit</Text>
                <Text note>
                  keep going but try to keep your attitude down to your foot..
                </Text>
              </Body>
              <Right>
                <Text note>4:43 pm</Text>
              </Right>
            </ListItem>

            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjJBekKMdzDiywHq0HKWbcyCI6m7n31nkG3A&usqp=CAU",
                  }}
                />
              </Left>
              <Body>
                <Text>Ariyana</Text>
                <Text note>I think you are doing overaction there..</Text>
              </Body>
              <Right>
                <Text note>8:09 pm</Text>
              </Right>
            </ListItem>

            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRy_mOmkk4pJVSF_IxRrBYrab1APVDD8mJEsQ&usqp=CAU",
                  }}
                />
              </Left>
              <Body>
                <Text>Mehaboob dilse</Text>
                <Text note>
                  You are too good yaar but try to mingle up more..
                </Text>
              </Body>
              <Right>
                <Text note>9:46 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headertext: {
    color: "#fff",
    fontFamily: "sans-serif-condensed",
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 10,
  },
  icon: {
    marginRight: 80,
    color: "#fff",
  },
});
