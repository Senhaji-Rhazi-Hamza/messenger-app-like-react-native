import React, { useState } from "react";
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';

const SignUpLogin = ({logIn}) => {
    const [login, setLogin] = useState(true);

    const switchState = () => {
        setLogin(!login);
    };

    return (
        <View style={styles.container} >
            <View style={styles.lineForm}>
                <View style={styles.label}>
                    <Text > Email </Text>
                </View>
                <View style={styles.input}>
                    <TextInput placeholder="email@email.com">
                    </TextInput>
                </View>
            </View>
            <View style={styles.lineForm}>
                <View style={styles.label}>
                    <Text> Password </Text>
                </View>
                <View style={styles.input}>
                    <TextInput placeholder="password">
                    </TextInput>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Login" color="green"  onPress = {logIn} />
                </View>
                <View style={styles.button}>
                    <Button title="SignUp" color="blue" />
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // backgroundColor : 'red'

    },
    lineForm: {
        paddingHorizontal :10, 
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        marginVertical : 10,
    }
    ,
    label: {
        width: '30%'
    },
    input : {
      
        width : '50%'
    },
    buttonContainer: {
           flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginVertical : 50,
    }
});

export default SignUpLogin;
