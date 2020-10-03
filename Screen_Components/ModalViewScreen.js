import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, View, FlatList, Alert, BackHandler, ToastAndroid ,TouchableOpacity} from 'react-native';
import GoalItem from './modal_content/GoalItem';
import GoalInput from './modal_content/GoalInput'
import {Container, Header , Left ,Right, Text ,Body , Icon , ActionSheet, Button, Root} from 'native-base';
import {AuthContext} from '../components/context';

var BUTTONS = [
  { text: "Sign Out", icon: "arrow-forward", iconColor: "#2c8ef4" },
  { text: "Close", icon: "close", iconColor: "red" },
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

export default function ModalViewScreen() {

  const [clicked,setmoreoptions] = useState(BUTTONS[0]);
  const [cousegoal, setcousegoal] = useState([]);
  const [isaddmode, setisaddmode] = useState(false);

  const { signOut } = useContext(AuthContext);

  const addgoalhandler = (goaltitle) => {
    if (goaltitle.trim() != 0) {
      console.log(goaltitle);
      setcousegoal(currentgoals =>
        [...cousegoal,
        { key: Math.random().toString(), value: goaltitle }]);
      showToast();
    }
    else Alert.alert('please enter something to add :)')
  }
  const removegoal = goalid => {
    setcousegoal(currentgoals => {
      return currentgoals.filter((goal) => goal.key != goalid)
    });
  }

  const showToast = () => {
    ToastAndroid.show("A New Goal is Added!", ToastAndroid.SHORT);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "YES", onPress: () => BackHandler.exitApp()
        }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Root>
    <Container>
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => setisaddmode(true)} style={{backgroundColor:'lightblue',padding:10,borderColor:'blue',borderWidth:1}}>
             <Text style={{textAlign:'center'}}> Add New Goal</Text>
      </TouchableOpacity>
      <GoalInput visible={isaddmode} offvisible={() => setisaddmode(false)} onaddgoal={addgoalhandler} />
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={cousegoal}
        renderItem={itemdata =>
          <GoalItem ondelete={removegoal}
            title={itemdata.item.value}
            id={itemdata.item.key} />}
      />
    </View>
    </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  headertext:{
    color:'#fff',
    fontFamily: "sans-serif-condensed",
    fontSize:25,
    fontWeight:'bold',
    marginRight:10
}
});
