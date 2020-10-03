import React, { useState, useContext } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  Foundation,
} from "@expo/vector-icons";
import { View } from "native-base";
import { User, AuthContext } from "../components/context";
import { StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  Switch,
  TouchableRipple,
} from "react-native-paper";

export default function DrawerContent(props) {
  const { signOut } = useContext(AuthContext);
  const [user, setuser] = useContext(User);

  const [isDarkTheme, SetIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    SetIsDarkTheme(!isDarkTheme);
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInterface}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={ user.googleuser !== null ?
                 {uri: user?.googleuser?.user?.photoUrl}:
                 [user.facebookuser !== null ?
                  {uri : user?.facebookuser?.photoURL}:
                  {uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1OzagelduOqZsuVoyAYQcGI-sHhwK7dIxVA&usqp=CAU"}
                 ]
                }
                size={90}
              />
              <View style={{ marginLeft: 8 }}>
                <Title style={styles.title}>
                 {user.anonymoususer !== null ? user?.anonymoususer?.name : 
                  [user.facebookuser !== null ? user?.facebookuser?.displayName :
                    [user.googleuser !== null ? user?.googleuser?.user.name : 
                      [user.phone_user !== null ? user?.phone_user?.user_name :
                        [user.new_user !== null ? user?.new_user?.name : "Unknown User"]
                      ]
                    ]
                  ]
                 }
                </Title>
                <Caption style={styles.captions}>
                  {user.anonymoususer !==null ? user?.anonymoususer?.email :
                    [user.facebookuser !== null ? user?.facebookuser?.providerData[0]?.email:
                      [user.googleuser !== null ? user?.googleuser?.user?.email :
                        [user.phone_user !== null ? user?.phone_user?.phone_no : 
                          [ user.new_user !== null ? user?.new_user?.email : "No email provided" ]
                        ]
                      ] 
                    ]
                  }
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawersection}>
            <TouchableNativeFeedback>
              <DrawerItem
                label="Home"
                labelStyle={styles.labelstyle}
                icon={() => (
                  <MaterialCommunityIcons name="home" size={23} color="#000" />
                )}
                onPress={() => {
                  props.navigation.navigate("Home");
                }}
              ></DrawerItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback>
              <DrawerItem
                label="Chat Room"
                labelStyle={styles.labelstyle}
                icon={() => <Entypo name="chat" size={24} color="#000" />}
                onPress={() => {
                  props.navigation.navigate("Chat Room");
                }}
              ></DrawerItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback>
              <DrawerItem
                label="Contacts"
                labelStyle={styles.labelstyle}
                icon={(Color) => (
                  <MaterialCommunityIcons
                    name="contacts"
                    size={24}
                    color="#000"
                  />
                )}
                onPress={() => {
                  props.navigation.navigate("Contacts");
                }}
              ></DrawerItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback>
              <DrawerItem
                label="Goals"
                labelStyle={styles.labelstyle}
                icon={() => (
                  <Foundation
                    name="clipboard-notes"
                    size={24}
                    color="#000"
                    style={{ marginLeft: 5, marginRight: 5 }}
                  />
                )}
                onPress={() => {
                  props.navigation.navigate("Goals");
                }}
              ></DrawerItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback>
              <DrawerItem
                label="Settings"
                labelStyle={styles.labelstyle}
                icon={() => (
                  <MaterialCommunityIcons
                    name="settings"
                    size={23}
                    color="#000"
                  />
                )}
                onPress={() => {
                  props.navigation.navigate("Settings");
                }}
              ></DrawerItem>
            </TouchableNativeFeedback>
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preferences}>
                <Text style={{ fontFamily: "sans-serif-condensed" }}>
                  Dark Theme
                </Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        label="Sign out"
        labelStyle={styles.labelstyle}
        icon={() => <AntDesign name="logout" size={24} color="#000" />}
        onPress={() => {
          signOut();
        }}
      ></DrawerItem>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInterface: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 19,
    marginTop: 3,
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontFamily: "sans-serif-condensed",
  },
  labelstyle: {
    fontFamily: "sans-serif-condensed",
    fontWeight: "bold",
    fontSize: 15,
  },
  captions: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "sans-serif-condensed",
    color:'#000'
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragragh: {
    fontWeight: "bold",
    marginRight: 15,
    fontFamily: "sans-serif-condensed",
  },
  drawersection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preferences: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
