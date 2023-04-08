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
import OTPLoginScreen from "./OTPbasedLogin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StoreDataController from "../Controller/StoreDataController";

const Application = () => {
  // const [user, setUser] = useState(false);
  const [patientData, setPatientData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPinSet, setIsPinSet] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("isPinset")
      .then((value) => {
        if (value !== null) {
          setIsPin(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (StoreDataController()) {
    console.log("Data Stored");
  } else {
    console.log("StoreDataController failed");
  }

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
          initialRouteName={isPinSet ? "PIN Lock" : "PIN Change"}
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
