import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost"
import _ from "lodash"
const userMessagesQuery = (idUser: number, idUserFriend: number) => {
  return gql`
       query {
        messages(where:  {id_receiver: {_in:  [${idUser}, ${idUserFriend}]} , id_sender: {_in:  [${idUser}, ${idUserFriend}]}  }, order_by: {creation_time_stmp: desc}) {
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


const SEND_MSG =  gql`
   mutation ($id_sender:bigint, $id_receiver:bigint, $msg_txt: String!)
  {
    insert_messages (
      objects: [{
        id_sender: $id_sender,
        msg_txt :$msg_txt,
        id_receiver:$id_receiver
      }]
    )
    {
       returning 
      {
        creation_time_stmp
        id_message
        id_receiver
        id_sender
        msg_txt
      }
    }
  }

`


const ChatSreen = ({ idUser , idUserFriend  }: { idUser: number, idUserFriend: number }) => {
  const [messages, setMessages] = useState([])
  const { loading, error, data } = useQuery(userMessagesQuery(idUser, idUserFriend));
  const [sendMsg, { dataMutation }] = useMutation(SEND_MSG);

  //if (loading) return <Text> "Loading...";</Text>
  //if (error) return <Text>`Error! ${error.message}`;</Text>

  function extractMessages(data) {
    const user = data.users[0]
    return (
      _.map(data.messages.slice(0, 5), (message) => (
        {
          _id: message.id_message ,
          text: message.msg_txt,
          createdAt: message.creation_time_stmp,
          user: {
            _id: message.id_sender == idUser ? 1 : 2,
            name: user.name,
            avatar: user.url_profile,
          },
        }

      )))
  }
  console.log("display messages")
  function onSend(message) {
    setMessages((messages) => GiftedChat.append(messages, message))
    //console.log(message[0].text)
    sendMsg({variables: { id_sender:idUser, id_receiver: idUserFriend , msg_txt: message[0].text } });
  }
  useEffect(() => {
    const onCompleted = (data) => {
       setMessages(extractMessages(data)) 
      };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);
  return (
    // <Text> Hello</Text>
    <GiftedChat
      messages={messages}
      showUserAvatar = {true}
      showAvatarForEveryMessage = {true}
      onSend={message => onSend(message)}
      user={{
        _id: idUser,
        name: 'React Native',
        //avatar: 'https://placeimg.com/140/140/any',
        name: (data) => data.users[0].name,
        avatar: (data) => data.users[0].url_profile,
      //  avatar : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      }}
    />
  );
}

export default ChatSreen;