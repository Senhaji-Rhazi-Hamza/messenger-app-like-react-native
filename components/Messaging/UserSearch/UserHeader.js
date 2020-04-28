// @flow
import React, {useState} from "react";
import { StyleSheet, View, Button, Text, Image, TextInput } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';


const urlProfile = 'Hello'

const userHeaderQuery = (idUser: number) => {
    return gql`
         query {
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
const UserHeader = ({ idUser}: { idUser: number} ) => {
    const [searchBarOnly, setSearchBarOnly] = useState(false)
    const { loading, error, data } = useQuery(userHeaderQuery(idUser), { pollInterval: 1000 });

    if (loading) return <Text>"Loading...";</Text>
    if (error) return <Text> `Error! ${error.message}`;</Text>

    return (
        <View style = {{flex : 1}}>
          { ! searchBarOnly && 
            <View style={styles.rowHeader}>
                <Image
                    style={styles.profilePic}
                    source={{ uri: data.users[0].url_profile }}
                />
                <Text style={styles.title}> Discussion</Text>
                <View style={styles.cntImg}>
                    <Image
                        style={styles.logo}
                        source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                    />
                    <Image
                        style={styles.logo}
                        source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                    />

                </View>
            </View>
        }
            <View style={styles.rowHeader}>
                <Image
                    style={styles.logoSearchBar}
                    source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                />
                <TextInput style={styles.containerSearchBar} placeholder='Search' onBlur = {() => setSearchBarOnly(false)} onFocus = {()=> setSearchBarOnly(true)}>

                </TextInput>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    rowHeader: {
        flexDirection: 'row',
        backgroundColor: 'white',
        //height: '50%',
        flex : 1,
        marginBottom: 1,
        minHeight : 70,
        alignItems: 'center'

    },
    profilePic: {
        aspectRatio: 1,
        height: '80%',
        borderRadius: 50
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profilePicture: {

    },
    logoSearchBar: {
        aspectRatio: 0.9,
        height: '100%',
        marginLeft: 1,
    },
    logo: {
        aspectRatio: 1,
        height: '80%',
        marginLeft: 1,

    },
    containerSearchBar: {
       // borderTopWidth: 2,
       // borderBottomWidth: 2,
        flex: 1,
        textAlign: 'center'

        //borderRightWidth: 4,

    },
    searchBar: {
        width: '100%',
        //borderStyle :''

    },
    cntImg: {
        marginLeft: 'auto',
        flexDirection: 'row',
    }
})

export default UserHeader;