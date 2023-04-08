import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import BottomNavigationBar from "../Utility/BottomNavigationBar";
import TopAppBar from "../Utility/TopAppBar";
import AppBar from "../Utility/AppBar";
import { SafeAreaView } from "react-native-safe-area-context";
import FollowupScreen from "./FollowUpScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
// import { Picker } from "@react-native-picker/picker";
import TodayFolloup from "./TodayFolloup";
import PastFolloup from "./PastFollowup";
import UpcomingFolloup from "./UpcomingFollowup";
// import FilterFollowups from "../Utility/FilterFollowups";

import { useRoute } from "@react-navigation/native";
import IconButton from "../Utility/IconButton";
import FilterHeader from "../Utility/FilterHeader";
import OTPPopUp from "../Utility/OTPPopUp";

const HomeScreen = ({ navigation }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [folloupTypeScreen, setFolloupTypeScreen] = useState("Today");
  const [showOTPPopUp, setShowOTPPopUp] = useState(false);

  const profileButtonHandler = () => {
    navigation.navigate("Profile");
  };
  useEffect(() => {
    if (navigation && navigation.setOptions) {
      navigation.setOptions({
        title: folloupTypeScreen + " Follow-ups",
        headerRight: () => {
          return (
            <IconButton
              iconName="person"
              iconColor="white"
              iconSize={24}
              onPress={profileButtonHandler}
            />
          );
        },
      });
    }
  }, [folloupTypeScreen, navigation]);

  const Header = () => {
    return (
      <View style={styles.header}>
        {/* <FilterFollowups selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/> */}
        <Text style={styles.headerText}> PID </Text>
        <Text style={styles.headerText}> Name</Text>
        <Text style={styles.headerText}> Address</Text>
        {folloupTypeScreen !== "Today" && (
          <Text style={styles.headerText}> Date</Text>
        )}
        <Text style={styles.headerText}> status</Text>
      </View>
    );
  };
  const LogoutHandler = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      style={styles.container_Home}
      source={require("../assets/bgimg.jpg")}
    >
      <OTPPopUp
        visible={showOTPPopUp}
        onVerify={() => setShowOTPPopUp(false)}
      />

      {/* <AppBar
        title="Home Medicare"
        handleLogout={LogoutHandler}
        navigation={navigation}
      /> */}

      <View style={styles.container_list}>
        <FilterHeader
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <Header />
        {folloupTypeScreen === "Today" && (
          <TodayFolloup
            navigation={navigation}
            // setUser={props.setUser}
            // setPatientData={props.setPatientData}
            selectedStatus={selectedStatus}
            showOTPPopUp={showOTPPopUp}
            setShowOTPPopUp={setShowOTPPopUp}
          />
        )}
        {folloupTypeScreen === "Past" && (
          <PastFolloup
            navigation={navigation}
            // setUser={props.setUser}
            // setPatientData={props.setPatientData}
            selectedStatus={selectedStatus}
            showOTPPopUp={showOTPPopUp}
            setShowOTPPopUp={setShowOTPPopUp}
          />
        )}
        {folloupTypeScreen === "Upcoming" && (
          <UpcomingFolloup
            navigation={navigation}
            // setUser={props.setUser}
            // setPatientData={props.setPatientData}
            selectedStatus={selectedStatus}
            showOTPPopUp={showOTPPopUp}
            setShowOTPPopUp={setShowOTPPopUp}
          />
        )}
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <BottomNavigationBar
          l1="Past"
          l2="Today"
          l3="Upcoming"
          setFolloupTypeScreen={setFolloupTypeScreen}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container_Home: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    height: 70,
    width: 400,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2B79E3",
  },
  headerText: {
    color: "white",
    marginLeft: 20,
    marginRight: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  container_list: {
    position: "relative",
    left: 0,
    top: 20,
    flex: 10,

    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 5,
  },
});
export default HomeScreen;
