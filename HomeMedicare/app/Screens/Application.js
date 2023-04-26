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
import SendCompletedFollowups from "../Controller/FetchFollowupToSendController";
// import axios from "axios";
import checkNetworkConnection from "../UtilityModules/NetworkConnectionChecker";
import APIURLUtilities from "../Controller/APIUrlUtilities";

const Application = () => {
  // const [patientData, setPatientData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPinSet, setIsPinSet] = useState(null);

  const sucessTimerDuration = 20000; // 20 seconds in case of success//50000000;
  const idleTimerDuration = 20000 * 3; // 60 seconds in case of failure or no data

  const sucessTimerUploadDuration = 30000; //1 Minute .... 60 * 1000 msec
  const idleTimerUploadDuration = 60000 * 2; //5 Minute ....  5 * 60 * 1000 msec

  // Checks for network connection in every 20 sec and send followups to server...
  const [sendTimer, setSendTimer] = useState(sucessTimerUploadDuration);

  // const [followUpSendResponse, setFollowUpSendResponse] = useState(true);
  useEffect(() => {
    const interval = setInterval(async () => {
      const NetworkCheck = await checkNetworkConnection();
      console.log("NetWork Connection => " + NetworkCheck);
      if (NetworkCheck) {
        SendCompletedFollowups({ setTimerHandler: setTimerHandler });
      } else {
        setTimer(idleTimerUploadDuration);
      }
    }, sendTimer);

    return () => clearInterval(interval);
  }, [sendTimer]);

  const setTimerHandler = (isSuccessTimer) => {
    console.log("#%^$%^$%^$^$^$^$");
    console.log(isSuccessTimer);

    if (isSuccessTimer) {
      setSendTimer(sucessTimerUploadDuration);
    } else {
      setSendTimer(idleTimerUploadDuration);
    }
  };

  //Checks for network connection in every 30 sec and send followups to server...
  // var isAPICallActive = false;
  const [timer, setTimer] = useState(sucessTimerDuration);
  // const sucessTimerDuration = 10000;

  useEffect(() => {
    const interval = setInterval(async () => {
      const NetworkCheck = await checkNetworkConnection();
      console.log("NetWork Connection => " + NetworkCheck);
      if (NetworkCheck) {
        StoreNewFollowupsInStorage({
          followUpDownLoadResponseHandler: followUpDownLoadResponseHandler,
        });
      } else {
        setTimer(idleTimerDuration);
      }
    }, timer);

    return () => clearInterval(interval);
  }, [timer]);

  const followUpDownLoadResponseHandler = (followUpDownloadData) => {
    console.log("****************************");
    console.log(followUpDownloadData);
    if (followUpDownloadData.isFollowUpListSuccessfully === true) {
      // isFollowUpListSuccessfully: true,
      //           followUpData: followUpData.responseData.data,
      //           errorMessage: null,
      console.log("Data reciebe=ved in app.js");
      if (followUpDownloadData.followUpData.length === 5) {
        setTimer(sucessTimerDuration);
      } else {
        console.log("5 min timer");
        setTimer(idleTimerDuration);
      }
    } else {
      setTimer(idleTimerDuration);
      console.log("error reciebe=ved in app.js");
    }
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
  var firstScreen;
  useEffect(() => {
    AsyncStorage.removeItem(APIURLUtilities.getStorageKey());
    console.log("kkkkkkkkkkkkkkkkkkkk");
    // AsyncStorage.removeItem("LoggedInData");

    // const checkLoggedInUser = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem("LoggedInData");
    //     if (value !== null) {
    //       setIsLoggedIn(true);
    //       console.log(isLoggedIn);
    //     }
    //   } catch (e) {
    //     console.log("Failed to load user token from AsyncStorage:", e);
    //   }
    //   // setIsLoading(false);
    // };

    // checkLoggedInUser();
  }, []);

  // useEffect(() => {
  //   if (!StoreDataController()) {
  //     console.log("Data Stored in Mobile Storage");
  //   } else {
  //     console.log("StoreDataController failed");
  //   }
  // }, []);

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
          initialRouteName="Login"
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
