import React, { useState, useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import TopAppBar from "../Utility/TopAppBar";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import FieldWorkerProfile from "./ProfileScreen";
import FollowupScreen from "./FollowUpScreen";
import ChangePINScreen from "./ChangePINScreen";
import PinLock from "./PinLockScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StoreDataController from "../Controller/StoreDataController";
import StoreNewFollowupsInStorage from "../Controller/StoreNewFollowupsInStorage";
// import SendCompletedFollowups from "../Controller/FetchFollowupToSendController";
// import axios from "axios";
import checkNetworkConnection from "../UtilityModules/NetworkConnectionChecker";

const Application = () => {
  // const [patientData, setPatientData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFollowUpDownloadFlag, setIsFollowUpDownload] = useState(false);
  const [isPinSet, setIsPinSet] = useState(null);
  // const [initialScreen, setInitialScreen] = useState("Login");

  //Checks for network connection in every 20 sec and send followups to server...
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const NetworkCheck = await checkNetworkConnection();
  //     console.log("NetWork Connection => " + NetworkCheck);
  //     if (NetworkCheck) {
  //       SendCompletedFollowups();
  //     }
  //   }, 20000);

  //   return () => clearInterval(interval);
  // }, []);

  //Checks for network connection in every 30 sec and send followups to server...

  useEffect(() => {
    const interval = setInterval(async () => {
      const NetworkCheck = await checkNetworkConnection();
      console.log("NetWork Connection => " + NetworkCheck);
      if (NetworkCheck) {
        StoreNewFollowupsInStorage({
          followUpDownLoadResponseHandler: followUpDownLoadResponseHandler,
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isFollowUpDownloadFlag]);

  const followUpDownLoadResponseHandler = (followUpDownloadData) => {
    console.log("****************************");
    console.log(followUpDownloadData);
  };

  // const initialScreen = () => {
  //   return AsyncStorage.getItem("isPinset")
  //     .then((value) => {
  //       if (value !== null) {
  //         console.log("PIN Lock");
  //         return "PIN Lock";
  //       } else {
  //         console.log("Pin Change");
  //         return "PIN Change";
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       return "PIN Change";
  //     });
  // };

  const getInitialScreen = () => {
    // console.log("********************************88");
    // console.log(initialScreen());
    // AsyncStorage.removeItem("FollowupData");
    // console.log("kkkkkkkkkkkkkkkkkkkk");
    AsyncStorage.getItem("AuthToken")
      .then((value) => {
        if (value !== null) {
          console.log("Storage has token stored ... ");
          // AsyncStorage.removeItem("isPinset");
        } else {
          return "PIN Change";
        }
      })
      .catch((error) => console.log(error));

    return "Login";
  };
  useEffect(() => {
    if (!StoreDataController()) {
      console.log("Data Stored in Mobile Storage");
    } else {
      console.log("StoreDataController failed");
    }
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#2B79E3" },
            headerTintColor: "white",
          }}
          initialRouteName={getInitialScreen()}
        >
          {/* <Stack.Screen name="OTPLogin" component={OTPLoginScreen} /> */}

          <Stack.Screen
            name="PIN Lock"
            component={PinLock}
            options={{
              title: "HomeMedicare",
            }}
          />

          <Stack.Screen
            name="PIN Change"
            component={ChangePINScreen}
            options={{
              title: "HomeMedicare",
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "HomeMedicare",
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "HomeMedicare",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={FieldWorkerProfile}
            options={{
              title: "Profile Settings",
            }}
          />
          <Stack.Screen
            name="Followup"
            component={FollowupScreen}
            options={{
              title: "Follow-up",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Application;
