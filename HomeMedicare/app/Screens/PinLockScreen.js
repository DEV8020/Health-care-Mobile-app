import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import OTPInput from "../Utility/OTPTextInputs";

const PinLock = ({ route, navigation }) => {
  const [PIN, setPIN] = useState("");
  const [PINInputDefault, setPINInputDefault] = useState(false);
  useEffect(() => {
    setPIN("");
  }, [navigation]);

  const handlePinCheck = () => {
    AsyncStorage.getItem("isPinSet")
      .then((value) => {
        if (value === PIN) {
          setPIN("");
          navigation.navigate("Home");

          ToastAndroid.show("PIN login successfully", ToastAndroid.SHORT);
          console.log("PIN Login successful");
        } else {
          ToastAndroid.show("Incorrect PIN", ToastAndroid.SHORT);
          console.log("Incorrect PIN");
        }
      })
      .catch((error) => console.log("PIN error" + error));
  };

  const handleForgotPIN = () => {
    // Handle forgot password logic here
    ToastAndroid.show("Please Contact your supervisor", ToastAndroid.LONG);
    console.log("Forgot PIN");
  };

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../assets/bgimg.jpg")}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>Enter PIN</Text>
        <View style={styles.inputView}>
          {/* <TextInput
            maxLength={4}
            minLength={4}
            style={styles.inputText}
            placeholder="PIN"
            keyboardType="number-pad"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={PIN}
            onChangeText={(text) => setPIN(text)}
          /> */}
          <OTPInput
            length={4}
            value={PIN}
            onChange={setPIN}
            setOtpInputDefault={setPINInputDefault}
            otpInputDefault={PINInputDefault}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handlePinCheck}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotBtn} onPress={handleForgotPIN}>
          <Text style={styles.forgotText}>Forgot PIN?</Text>
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
    top: 100,
    left: 18,
    borderRadius: 15,
    width: 380,
    height: 450,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000000",
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

    borderRadius: 25,
    height: 60,
    marginBottom: 20,
    justifyContent: "flex-end",
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 20,
  },
  forgotBtn: {
    height: 30,
    marginBottom: 30,
  },
  forgotText: {
    color: "#003f5c",
    fontSize: 16,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#2B79E3",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PinLock;
