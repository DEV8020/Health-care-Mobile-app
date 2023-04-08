import React from 'react';
import { Appbar } from 'react-native-paper';
import {StyleSheet, View } from 'react-native';
import  {SafeAreaView} from 'react-native-safe-area-context';

const AppBar = ({title,handleLogout,navigation}) => {
    
    const _handleProfile = () => {
        navigation.navigate("Profile");
        console.log('ProfileScreen');}
    const _handleSettings = () => console.log('Settings');
  
    return (
        
      <Appbar.Header style={styles.container_appbar}>
        <Appbar.Content titleStyle={{ fontWeight: 'bold', fontSize: 30, color:"white"}} title={title} />
    <Appbar.Action icon="account" size={30} color="white"  onPress={_handleProfile} />
        {/* <Appbar.Action icon="setting" color="#2797F0"  onPress={_handleSettings} /> */}
         </Appbar.Header>
      
    );
  };

  const styles = StyleSheet.create({
    container_appbar:{
        height:40,
        
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        borderColor:"white",
        width:"100%",
   
        elevation: 15,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 3,
      shadowRadius: 1,
      backgroundColor:"#2B79E3",
      alignItems:'center',
      justifyContent:'center',
    
    },

    title: {
        fontWeight: "bold",
        fontSize: 15,
        color: "white",
    },
    button: {
      backgroundColor: "#2797F0",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    content: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default AppBar;