import React, { useState, useEffect } from "react";
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
import LoginController from "../Controller/LoginController";
import ProfileDataController from "../Controller/ProfileDataController";

const LoginScreen = ({ navigation }) => {
  var credentials = {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // isLoginFlag: false,
  // loggedInUserData: null,
  // errorMessage: loginServiceData.responseError.message,
  useEffect(() => {
    // AsyncStorage.removeItem("LoggedInData");
    console.log("kkkkkkkkkkkkkkkkkkkk");

    const checkLoggedInUser = async () => {
      try {
        const value = await AsyncStorage.getItem("LoggedInData");
        if (value !== null) {
          AsyncStorage.getItem("isPinSet").then((value) => {
            if (value !== null) {
              console.log(value);
              navigation.replace("PIN Lock");
            } else {
              navigation.replace("PIN Change");
            }
          });
        }
      } catch (e) {
        console.log("Failed to load user token from AsyncStorage:", e);
      }
      // setIsLoading(false);
    };

    checkLoggedInUser();
  }, []);

  // sProfileDataFlag: false,
  //         profileData: null,
  //         errorMessage: profileServiceData.responseError.message,

  const ProfileResponseHandler = (profileResponseData) => {
    console.log(
      "_______________________Profile details response handler______________________"
    );
    console.log(profileResponseData.profileData);
    if (profileResponseData.isProfileDataFlag) {
      console.log("Get ProfileData success................. ");
      AsyncStorage.setItem(
        "ProfileData",
        JSON.stringify(profileResponseData.profileData)
      )
        .then(() => {
          console.log("User profile data stored successfully!");
        })
        .catch((error) => console.log(error));
    }
  };
  const LoginResponseHandler = (loginResponseData) => {
    console.log("Login Response Data");
    console.log(loginResponseData.loggedInUserData);
    if (loginResponseData.isLoginFlag) {
      console.log("Login successfull !!!!");
      ToastAndroid.show("Login successfull ", ToastAndroid.SHORT);

      AsyncStorage.setItem(
        "LoggedInData",
        JSON.stringify(loginResponseData.loggedInUserData)
      )
        .then(() => {
          // LoginController.GetUserLoginData({
          //   userData: userData,
          //   userLoginResponseHandler: LoginResponseHandler,
          // });
          ProfileDataController.GetUserProfileDetails({
            userProfileResponseHandler: ProfileResponseHandler,
          });

          console.log("User login token stored successfully!");
        })
        .catch((error) => console.log(error));

      setEmail("");
      setPassword("");
      navigation.replace("PIN Change");
    } else {
      ToastAndroid.show(loginResponseData.errorMessage, ToastAndroid.SHORT);
      console.log(loginResponseData.errorMessage);
    }
  };

  const handleLogin = () => {
    const userData = {
      role: "ROLE_FIELD_WORKER",
      username: email,
      password: password,
    };

    LoginController.GetUserLoginData({
      userData: userData,
      userLoginResponseHandler: LoginResponseHandler,
    });

    // Handle login logic here
  };
  const handleForgotPassword = () => {
    ToastAndroid.show("Please Contact your supervisor", ToastAndroid.TOP);
    console.log("Forgot Password");
    // Handle forgot password logic here
  };

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../assets/bgimg.jpg")}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>Home Medicare</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
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
    top: 90,
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
    color: "#2196F3",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
