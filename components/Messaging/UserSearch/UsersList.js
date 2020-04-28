// @flow
import React, {useState} from "react";
import { StyleSheet, View, FlatList, Text } from 'react-native';
import UserElement from "./UserElement"


const UsersList = ({idUser}:{idUser:number}) => {
    const [friendsUser, setFriendsUser] = useState([2,3,4,5,6,7])
    return (
        <View style={styles.userListContainer}>
            <FlatList style  = {styles.flatListContainer}
                keyExtractor={(item, index) => index.toString()}
                data={friendsUser}
                renderItem={itemData => ( 
                 <UserElement idUser ={itemData.item}/> 
                )}
            />
            {/* <UserElement idUser ={0} urlProfile = {"helo"} userName = {"helo"} lastMessageRecieved = {"helo"} /> */}

        </View>
    );
}

styles = StyleSheet.create({
    userListContainer: {
        flex: 1,
    },
    flatListContainer: {
        flex: 1,        
    }
})

export default UsersList;
