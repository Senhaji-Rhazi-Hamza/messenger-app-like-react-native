import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import SignUpLogin from './components/SignUpLogin'
import {ChatScreen, UserSearch} from './components/Messaging'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import ChatSreen from "./components/Messaging/ChatScreen";


const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export const client = new ApolloClient({
  uri: "https://test-messaging-app.herokuapp.com/v1/graphql",
});

export default function App() {
  const [logedIn, setLogedIn] = useState(false);
  const [idMainUser, setIdMainUser] = useState(1);
  const [idUserFriend, setIdUserFriend] = useState(2);

  //const [idMainUserFriend, setIdMainUserFriend] = useState(2);


  function logIn() {
    setLogedIn(true);
    console.log('loged in ')
  };
  console.log("hello there")
  return (
    <ApolloProvider client={client}>
    <View style={styles.screen}   >
         { !logedIn && <SignUpLogin logIn ={logIn} /> || 
         <ChatSreen idUser = {idMainUser} idUserFriend = {idUserFriend}/>

         }
    </View>
</ApolloProvider>
  );
}




const styles = StyleSheet.create({
  screen: {
    padding: 20,
    // backgroundColor:'blue',
    flex : 1,

  }
});

AppRegistry.registerComponent('MyApplication', () => App);
