import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const GoalItem = props => {
    return (
        <TouchableNativeFeedback>
        <View style={styles.container}>
            <View style={styles.listitem}>
                <Text>{props.title}</Text>
            </View>
            <TouchableOpacity onPress={props.ondelete.bind(this, props.id)} >
                <View style={styles.icon}>
                    <Text><AntDesign name="closecircle" size={24} color="black" /></Text>
                </View>
            </TouchableOpacity>
        </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: 'black',
        backgroundColor: '#ccc',
        borderWidth: 1,
        marginVertical: 7,
        borderRadius: 10,
        overflow: 'visible',
    },
    listitem: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: '80%',
    },
    icon: {
        padding: 10,
        marginVertical: 7,
        marginLeft: 0
    }
});
export default GoalItem;