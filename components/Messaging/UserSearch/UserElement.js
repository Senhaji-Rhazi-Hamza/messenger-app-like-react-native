// @flow
import React from "react";
import { StyleSheet, View, Image, Text } from 'react-native';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const userElementQuery = (idUser: number) => {
  return gql`
       query {
        messages(where: {id_receiver: {_eq: ${idUser}}}, order_by: {creation_time_stmp: desc}) {
          creation_time_stmp
          id_message
          id_receiver
          id_sender
          msg_txt
        }
        users(where: {id_user: {_eq: ${idUser}}}) {
          email
          id_user
          name
          password
          url_profile
        }
      }
      `;
};

const UserElement = ({ idUser }: { idUser: number }) => {
  console.log(idUser)
  const { loading, error, data } = useQuery(userElementQuery(idUser), {pollInterval: 1500});
  if (loading) return <Text> "Loading...";</Text>
  if (error) return   <Text>`Error! ${error.message}`;</Text>
  
  return (
    <View style={styles.container}>
    <View style={styles.containerProfilePic}>
      
        <Image
          style={styles.profilePic}
          source={{ uri: data.users[0].url_profile }}
        />
      </View>
 
      <View>
        <Text> { data.users[0].name} </Text>
        <Text style = {{color : 'silver'}}> {data.messages.length ? data.messages[0].msg_txt : ''}</Text>
      </View>
    </View>

  );
};

const styles = StyleSheet.create(
  {
    container: {
      flexDirection: 'row',
      height: 70,
      backgroundColor : 'white',
     // justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth : 2
    },
    containerProfilePic: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '20%'

    },

    profilePic: {
      borderRadius : 50,
      aspectRatio: 1,
        height: '80%',
       
    }

  }
)
export default UserElement;

