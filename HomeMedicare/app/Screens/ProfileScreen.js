import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../Utility/AppBar";
import ChangePINScreen from "./ChangePINScreen";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FieldWorkerProfile = ({ route }) => {
  const { profileData } = route.params;
  // const [profileData, setProfileData] = useState({});
  // address
  // :
  // "fieldworker"
  // authId
  // :
  // 102
  // availableStatus
  // :
  // true
  // contact
  // :
  // "9015346166"
  // name
  // :
  // "fieldworker"
  // password
  // :
  // "$2a$10$Z2vvuyMGuzRHXtCgIjtn7eLGMkHiluJOzPmhQQetU2iCGwWXI4a3."
  // pincode
  // :
  // 201009
  // role
  // :
  // "ROLE_FIELD_WORKER"
  // supervisor
  // :
  // address
  // :
  // "Bangalore"
  // authId
  // :
  // 4
  // contact
  // :
  // "9874587458"
  // name
  // :
  // "Supervisor Gupta"
  // password
  // :
  // "$2a$10$GZAldqS/pY0c5CuHviu2vut954JaFw/6RhLKEfD3SZBZDxx0mjIlm"
  // pincode
  // :
  // 560100
  // role
  // :
  // "ROLE_SUPERVISOR"
  // username
  // :
  // "supervisor"
  // [[Prototype]]
  // :
  // Object
  // username
  // :
  // "fieldworker"
  // useEffect(async () => {
  //   await
  // }, []);

  const navigation = useNavigation();

  const handlePINPress = () => {
    console.log("Change Pin");
    navigation.navigate("PIN Change");
  };
  const logout = async () => {
    try {
      AsyncStorage.removeItem("isLoggedIn");
      navigation.dispatch(StackActions.replace("PIN Lock"));
      // Navigate to the login screen or any other screen you want
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/bgimg.jpg")}
    >
      <View style={styles.allfield_outer_view}>
        <View style={styles.allfield_view}>
          <Text style={styles.title}>Fieldworker ID:</Text>
          <Text style={styles.input} placeholder="Fieldworker ID">
            {profileData.supervisor.authId}
          </Text>
        </View>
        <View style={styles.allfield_view}>
          <Text style={styles.title}>Name:</Text>
          <Text style={styles.input} placeholder="Email">
            {profileData.name}
          </Text>
        </View>

        <View style={styles.allfield_view}>
          <Text style={styles.title}>Contact:</Text>
          <Text style={styles.input} placeholder="Contact Number">
            {profileData.contact}
          </Text>
          {/* <TouchableOpacity
            onPress={handleContactNumberPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Change Contact Number</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.allfield_view}>
          <Text style={styles.title}>Address:</Text>
          <Text style={styles.input} placeholder="Address">
            {profileData.address}
          </Text>
          {/* <TouchableOpacity onPress={handleEmailPress} style={styles.button}>
            <Text style={styles.buttonText}>Change Email</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.allfield_view}>
          <Text style={styles.title}>Supervisor Name:</Text>
          <Text style={styles.input} placeholder="Supervisor Name">
            {profileData.supervisor.name}
          </Text>
        </View>
        <View style={styles.allfield_view}>
          <Text style={styles.title}>Supervisor Contact:</Text>
          <Text style={styles.input} placeholder="Supervisor Contact">
            {profileData.supervisor.contact}
          </Text>
        </View>
        <View style={styles.allfield_view}>
          <Text style={styles.title}>Supervisor Address:</Text>
          <Text style={styles.input} placeholder="Supervisor Address">
            {profileData.supervisor.address}
          </Text>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={handlePINPress}
            style={styles.buttonChangePIN}
          >
            <Text style={styles.buttonText}>Change PIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    resizeMode: "cover",
  },
  container_profile: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    backgroundColor: "blue",
    padding: 5,
    alignContent: "center",
    borderRadius: 10,
  },
  title: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#295490",
  },
  input: {
    height: 35,
    width: 200,
    fontSize: 16,
    padding: 5,
    textAlign: "center",
    backgroundColor: "white",
  },

  buttonView: {
    position: "absolute",
    bottom: 40,
    left: 10,
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonChangePIN: {
    width: "100%",
    height: "100%",
    backgroundColor: "#AD0C1E",

    paddingVertical: 10,
    alignItems: "center",

    height: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  allfield_view: {
    marginTop: 9,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 45,
    alignItems: "center",
    borderRadius: 2,
    height: 90,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 10,
  },
  allfield_outer_view: {
    flex: 1,
    position: "absolute",
    height: "100%",
    top: 10,
    left: 0,
    padding: 10,
  },
});

// const styles = StyleSheet.create({
//   container:{flex:1,},
//     container_profile: {
//         position:"relative",
//         top:20,
//         left:0,
//         marginStart:"5%",
//         marginEnd:"5%",
//         justifyContent:"center",

//     height:750,
//     width:"90%",

//     backgroundColor: 'white',
//     padding: 20,
//     flexDirection:"column",
//     elevation: 15,
//       shadowColor: '#000000',
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 2,
//       shadowRadius: 1,
//       borderRadius:10,

//   },
//   allfield_view:{
//     flexDirection:"column",
//     marginStart:10,
//     marginBottom:6,
//     borderColor:"silver",
//   },
//   title: {

//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color:"#2797F0",

//   },
//   input: {
//     marginStart:"5%",
//     borderRadius:10,
//     width: '70%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   button: {
//     marginStart:"5%",
//     width:"60%",
//     backgroundColor: "#2797F0",
//     padding: 10,
//     borderRadius: 15,

//   },
//   buttonChangePIN:{
//     height:40,
//     marginStart:"10%",
//     width:"30%",
//     backgroundColor: "green",
//     padding: 7,
//     borderRadius: 15,
//     alignItems:"center"
//   },
//   buttonText: {

//     color: 'white',
//     textAlign: 'center',
//   },
// });

export default FieldWorkerProfile;
