import React, { useState } from "react";
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

const FieldWorkerProfile = (props) => {
  const [name, setName] = useState("Dev");
  const [contactNumber, setContactNumber] = useState("9909397887");
  const [email, setEmail] = useState("dev@email.com");
  const [address, setAddress] = useState("IIITB");
  const [password, setPassword] = useState("********");
  const [pinChange, setPINChange] = useState(false);

  const handleNameChange = (text) => setName(text);
  const handleContactNumberChange = (text) => setContactNumber(text);
  const handleEmailChange = (text) => setEmail(text);
  const handleAddressChange = (text) => setAddress(text);
  const handlePasswordChange = (text) => setPassword(text);

  const handleContactNumberPress = () => console.log("Change Contact Number");
  const handleEmailPress = () => console.log("Change Email");
  const handleAddressPress = () => console.log("Change Address");
  const handlePasswordPress = () => console.log("Change Password");

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
      <View style={styles.container_profile}>
        <View style={styles.allfield_view}>
          <Text style={{ fontSize: 20 }}>Name:</Text>
          <Text
            style={styles.input}
            onChangeText={handleNameChange}
            placeholder="Email"
          >
            {name}
          </Text>
        </View>

        <View style={styles.allfield_view}>
          <Text style={{ fontSize: 20 }}>Contact Number</Text>
          <Text
            style={styles.input}
            onChangeText={handleContactNumberChange}
            placeholder="Contact Number"
          >
            {contactNumber}
          </Text>
          {/* <TouchableOpacity
            onPress={handleContactNumberPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Change Contact Number</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.allfield_view}>
          <Text style={{ fontSize: 20 }}>Email</Text>
          <Text
            style={styles.input}
            onChangeText={handleEmailChange}
            placeholder="Email"
          >
            {email}
          </Text>
          {/* <TouchableOpacity onPress={handleEmailPress} style={styles.button}>
            <Text style={styles.buttonText}>Change Email</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.allfield_view}>
          <Text style={{ fontSize: 20 }}>Address</Text>
          <Text
            style={styles.input}
            onChangeText={handleAddressChange}
            placeholder="Address"
          >
            {address}
          </Text>
          {/* <TouchableOpacity onPress={handleAddressPress} style={styles.button}>
            <Text style={styles.buttonText}>Change Address</Text>
          </TouchableOpacity> */}
        </View>
        {/* <View style={styles.allfield_view}>
            <Text style={{ fontSize: 20 }}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Password"
              secureTextEntry
            />
            <TouchableOpacity
              onPress={handlePasswordPress}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View> */}
        <View style={{ flexDirection: "row" }}>
          {/* <Text style={styles.title}>Profile Settings</Text> */}

          <TouchableOpacity
            onPress={handlePINPress}
            style={styles.buttonChangePIN}
          >
            <Text style={styles.buttonText}>Change PIN</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={logout} style={styles.buttonChangePIN}>
            <Text style={styles.buttonText}>logout</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    resizeMode: "cover",
    justifyContent: "center",
  },
  container_profile: {
    flex: 1,
    margin: 10,
    padding: 10,

    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    flex: 1,
    color: "#2B79E3",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#2B79E3",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  buttonChangePIN: {
    width: "40%",
    backgroundColor: "#AD0C1E",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
    height: 40,
    elevation: 10,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  allfield_view: {
    marginVertical: 5,
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
