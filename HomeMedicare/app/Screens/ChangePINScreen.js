import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

const ChangePINScreen = ({ route, navigation }) => {
  const [PIN, setPIN] = useState("");
  const [confirmPIN, setConfirmPIN] = useState("");

  const handleChangePIN = () => {
    if (PIN === confirmPIN) {
      AsyncStorage.getItem("isPinset")
        .then((value) => {
          if (value !== null) {
            AsyncStorage.setItem("isPinSet", PIN)
              .then(() => {
                ToastAndroid.show(
                  "PIN changed successfully",
                  ToastAndroid.SHORT
                );
                console.log("User has Changed PIN successfully!");
              })
              .catch((error) => {
                ToastAndroid.show(error, ToastAndroid.SHORT);
                console.log(error);
              });
            navigation.goBack();
          } else {
            AsyncStorage.setItem("isPinSet", PIN)
              .then(() => {
                ToastAndroid.show(
                  "PIN changed successfully",
                  ToastAndroid.SHORT
                );
                console.log("User has Changed PIN successfully!");
              })
              .catch((error) => {
                ToastAndroid.show(error, ToastAndroid.SHORT);
                console.log(error);
              });
            navigation.replace("PIN Lock");
          }
        })
        .catch((error) => console.log(error));
    } else {
      ToastAndroid.show(
        "Pin and Confirm Pin are different",
        ToastAndroid.SHORT
      );
      console.log("pin and confirm_pin are different");
    }
  };

  const handleCancelPIN = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../assets/bgimg.jpg")}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>Pin Change</Text>
        <View style={styles.inputView}>
          <TextInput
            maxLength={4}
            minLength={4}
            keyboardType="number-pad"
            style={styles.inputText}
            placeholder="Enter New PIN"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPIN(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
          maxLength={4}
          minLength={4}
            keyboardType="number-pad"
            style={styles.inputText}
            placeholder="Confirm PIN"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setConfirmPIN(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleChangePIN}>
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
    left: 20,
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
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgot: {
    color: "#2B79E3",
    fontSize: 11,
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
    color: "#2196F3",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default ChangePINScreen;
