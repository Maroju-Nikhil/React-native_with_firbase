import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Modal,Alert } from 'react-native';

const GoalInput = props => {
    const [enteredgoal, setenteredgoal] = useState('')

    const goalinputhandler = (enteredtext) => {
        setenteredgoal(enteredtext);
        //Alert.alert(enteredtext);
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.textcontainer}>
                <TextInput
                    placeholder="Enter Something"
                    style={styles.input}
                    onChangeText={goalinputhandler}
                    value={enteredgoal} />
                <View style={styles.buttoncontainer}>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={props.onaddgoal.bind(this, enteredgoal)} />
                    </View>
                    <View style={styles.button}>
                        <Button title="CANCEL" onPress={props.offvisible} color="red" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    textcontainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 9,
        marginBottom: 10
    },
    buttoncontainer: {
        flexDirection: 'row',
        justifyContent:'center',
        width: '75%'
    },
    button:{
        width:'50%',
        marginHorizontal:5,
    }
});

export default GoalInput;