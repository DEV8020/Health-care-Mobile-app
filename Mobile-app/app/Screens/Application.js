import React, { useState } from "react";
import { View, Text } from "react-native";
import TopAppBar from "../Utility/TopAppBar";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import FieldWorkerProfile from "./ProfileScreen";
import FollowupScreen from "./FollowUpScreen";
import ChangePINScreen from "./ChangePINScreen";

const Application = () => {
  const [user, setUser] = useState("logout");
  const [patientData, setPatientData] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {user === "logout" && <LoginScreen user={user} setUser={setUser} />}
      {user === "HomeScreen" && (
        <HomeScreen
          user={user}
          setUser={setUser}
          setPatientData={setPatientData}
        />
      )}
      {user === "ProfileScreen" && (
        <FieldWorkerProfile user={user} setUser={setUser} />
      )}
      {user === "FollowupScreen" && (
        <FollowupScreen
          user={user}
          setUser={setUser}
          selectedID={patientData}
        />
      )}
      {user === "ChangePINScreen" && (
        <ChangePINScreen
          user={user}
          setUser={setUser}
          
        />
      )}
    </SafeAreaView>
  );
};

export default Application;
