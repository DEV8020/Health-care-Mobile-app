import React, { useState, useEffect, useRef, useCallback } from "react";
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
import FetchFollowup from "../Controller/FetchFollowupByDateController";
import { TouchableWithoutFeedback } from "react-native";
// import FilterFollowups from "../Utility/FilterFollowups";

import { useRoute } from "@react-navigation/native";
import IconButton from "../Utility/IconButton";
import FilterHeader from "../Utility/FilterHeader";
import OTPPopUp from "../Utility/OTPPopUp";
import IdleTimer from "react-native-idle-timer";
import IdleTimerContainer from "../UtilityModules/IdleTimer";
import APIURLUtilities from "../Controller/APIUrlUtilities";

const IDLE_SCREEN_TIME = 70000;
const HomeScreen = ({ navigation }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [folloupTypeScreen, setFolloupTypeScreen] = useState("Today");
  const [showOTPPopUp, setShowOTPPopUp] = useState(false);
  const [followupData, setFollowupData] = useState({});
  const [followupList, setFollowupList] = useState([]);
  //....
  // const hasInteractedRef = useRef(false);
  // const timeoutRef = useRef();

  // const resetTimeout = useCallback(() => {
  //   clearTimeout(timeoutRef.current);

  //   if (!hasInteractedRef.current) {
  //     timeoutRef.current = setTimeout(() => {
  //       hasInteractedRef.current = false;
  //       navigation.navigate("PIN Lock");
  //     }, 5000);
  //   }
  // }, [navigation]);

  // useEffect(() => {
  //   resetTimeout();

  //   return () => {
  //     clearTimeout(timeoutRef.current);
  //   };
  // }, [resetTimeout]);

  // const interactionHandler = useCallback(() => {
  //   console.log("Intereacted");
  //   hasInteractedRef.current = true;
  //   resetTimeout();
  // }, [resetTimeout]);

  //....

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("PIN Lock");
    }, IDLE_SCREEN_TIME); // Set the timeout duration to 5 seconds (5000 milliseconds)

    return () => clearTimeout(timeout); // Clear the timeout if the component unmounts
  }, [navigation]);

  const profileButtonHandler = () => {
    navigation.navigate("Profile");
  };

  useEffect(() => {
    FetchFollowup(followupList, setFollowupList, folloupTypeScreen);
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

  return (
    <ImageBackground
      style={styles.container_Home}
      source={require("../assets/bgimg.jpg")}
    >
      <OTPPopUp
        visible={showOTPPopUp}
        onVerify={() => setShowOTPPopUp(false)}
        followupData={followupData}
        setFollowupData={setFollowupData}
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
            followupList={followupList}
            selectedStatus={selectedStatus}
            showOTPPopUp={showOTPPopUp}
            setFollowupData={setFollowupData}
            followupData={followupData}
            setShowOTPPopUp={setShowOTPPopUp}
          />
        )}
        {folloupTypeScreen === "Past" && (
          <PastFolloup
            navigation={navigation}
            // setUser={props.setUser}
            // setPatientData={props.setPatientData}
            followupList={followupList}
            selectedStatus={selectedStatus}
            showOTPPopUp={showOTPPopUp}
            setFollowupData={setFollowupData}
            followupData={followupData}
            setShowOTPPopUp={setShowOTPPopUp}
          />
        )}
        {folloupTypeScreen === "Upcoming" && (
          <UpcomingFolloup
            navigation={navigation}
            // setUser={props.setUser}
            // setPatientData={props.setPatientData}
            followupList={followupList}
            selectedStatus={selectedStatus}
            showOTPPopUp={showOTPPopUp}
            setFollowupData={setFollowupData}
            followupData={followupData}
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
