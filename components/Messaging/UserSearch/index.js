
import React, { useState } from "react";
import UserHeader from './UserHeader'
import UsersList from './UsersList'
import { StyleSheet, View, Button, Text } from 'react-native';

const UserSearch = ({idUser}:{idUser:number}) => {
    const [searchBarFocus, setSearchBarFocus] = useState(false)
    return (
        <View style = {styles.container}>
         <View style = {styles.headerBar}>
            <UserHeader  idUser  = {idUser}  />
         </View>
            <UsersList idUser = {idUser}/> 
               
        </View>
        
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerBar: {
        maxHeight : '20%',
        flex :1,
       minHeight : '10%'
    }
});

export default UserSearch;
