import React, { useState } from "react";
import  {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const ChangePINScreen = (props) => {
  const [PIN, setPIN] = useState("");
  const [confirmPIN, setConfirmPIN] = useState("");

  const handleLogin = () => {
    props.setUser("HomeScreen");
    
    // Handle login logic here
  };
  const handleCancelPIN = () => {
    // Handle forgot password logic here
    props.setUser("ProfileScreen");
  };
  if(props.user !== "ChangePINScreen")return null;
  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../assets/bgimg.jpg")}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>PIN Change</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter New PIN"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPIN(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Confirm PIN"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPIN(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleCancelPIN}>
        <Text style={styles.loginText}>Cancel</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    position: "absolute",
    top: 200,
    left:20,
    borderRadius: 15,
    width: 380,
    height: 450,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#2B79E3",
    marginBottom: 40,
    
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    elevation: 1,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#2B79E3",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  forgotPasswordText: {
    color: '#2196F3',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default ChangePINScreen;
