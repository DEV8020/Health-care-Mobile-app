import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { View,SafeAreaView,StyleSheet,Text,TouchableOpacity } from 'react-native';
import { Appbar, Button, } from 'react-native-paper';

const TopAppBar = ({ title, onLogout }) => {
  

  return (
    <SafeAreaView style={styles.container_appbar}>
    <View style={styles.appBar}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container_appbar:{
        top:50,
        flex:0.25,
        borderBottomColor:"silver",
        width:"100%",
        elevation: 15,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2,
      backgroundColor:"white",
    
    },
    appBar: {
        flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      
      paddingHorizontal: 16,
      height: 64,
      borderBottomWidth: 1,
      borderBottomColor: 'silver',
      
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#2797F0",
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
  
export default TopAppBar;
