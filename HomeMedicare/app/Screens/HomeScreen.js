import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
} from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ToastAndroid,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptionUtilityModule from "../UtilityModules/Encryption";
// import Application from "./Application";

const IDLE_SCREEN_TIME = 70000000;

const HomeScreen = ({ navigation, route }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [folloupTypeScreen, setFolloupTypeScreen] = useState("Today");
  const [showOTPPopUp, setShowOTPPopUp] = useState(false);
  const [followupData, setFollowupData] = useState({});
  const [followupList, setFollowupList] = useState([]);
  // const [refreshed, setRefreshed] = useState(true);
  // setRefreshed(route.params);
  // const handleChildFunction = () => {
  //   // Do something here
  //   console.log("Child function executed from parent component!");
  // };

  // useImperativeHandle(ref, () => ({
  //   handleChildFunction: handleChildFunction,
  // }));
  console.log(
    "---------------------------------------------------------------------------------"
  );
  // console.log(isDataDownload);

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

  const profileButtonHandler = async () => {
    var profileData;
    await AsyncStorage.getItem("ProfileData")
      .then((data) => {
        profileData = JSON.parse(data);
        // const key = CryptoJS.enc.Latin1.parse("1234567812345678");
        // const iv = CryptoJS.enc.Latin1.parse("1234567812345678");
        // const encryptedData = EncryptionUtilityModule.encryptData(
        //   data,
        //   key,
        //   iv
        // );
        // console.log(encryptedData);
        // AsyncStorage.setItem("dummydata", encryptedData);

        // AsyncStorage.getItem("dummydata").then((encryptedData) => {
        //   const key = CryptoJS.enc.Latin1.parse("1234567812345678");
        //   const iv = CryptoJS.enc.Latin1.parse("1234567812345678");
        //   const decryptedData = EncryptionUtilityModule.decryptData(
        //     encryptedData,
        //     key,
        //     iv
        //   );
        //   console.log(decryptedData); // This will log the original data object
        // });
        // console.log(profileData);
      })
      .catch((error) => console.log(error));

    navigation.navigate("Profile", { profileData: profileData });
  };

  useEffect(() => {
    // console.log(route.params);
    // ToastAndroid.show("refreshed", ToastAndroid.SHORT);
    FetchFollowup(followupList, setFollowupList, folloupTypeScreen);
    if (navigation && navigation.setOptions) {
      navigation.setOptions({
        title: folloupTypeScreen + " Follow-ups",
        headerRight: () => {
          return (
            <IconButton
              iconName="person"
              iconColor="white"
              iconSize={28}
              onPress={profileButtonHandler}
            />
          );
        },
      });
    }
  }, [folloupTypeScreen, navigation]);

  const fetchData = () => {
    FetchFollowup(followupList, setFollowupList);
  };

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText_Middle}> Followup List </Text>
        <Text style={styles.headerText}> (tap on any followup to proceed)</Text>
        <View style={styles.header_row}>
          {/* <FilterFollowups selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/> */}
          <Text style={styles.headerText}> FID </Text>
          <Text style={styles.headerText}> Name</Text>
          {/* <Text style={styles.headerText}> Address</Text> */}
          <Text style={styles.headerText}> Date</Text>
          <Text style={styles.headerText}> status</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <ImageBackground
        style={styles.container_Home}
        source={require("../assets/bgimg.jpg")}
      >
        <OTPPopUp
          visible={showOTPPopUp}
          setShowOTPPopUp={setShowOTPPopUp}
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
              fetchData={fetchData}
              folloupTypeScreen={folloupTypeScreen}
              setFollowupList={setFollowupList}
            />
          )}
          {folloupTypeScreen === "Past" && (
            <PastFolloup
              setFollowupList={setFollowupList}
              fetchData={fetchData}
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
              setFollowupList={setFollowupList}
              fetchData={fetchData}
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
            folloupTypeScreen={folloupTypeScreen}
          />
        </View>
      </ImageBackground>
    </>
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
    alignItems: "center",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "white",
    backgroundColor: "#2B79E3",
    height: 100,
    width: 410,
    padding: 5,
  },
  header_row: {
    flexDirection: "row",
    height: 50,
    width: 400,
    marginTop: 15,
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  headerText: {
    color: "white",
    marginLeft: 23,
    marginRight: 35,
    fontSize: 15,
  },
  headerText_Middle: {
    color: "white",
    marginLeft: 20,
    marginRight: 40,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  container_list: {
    position: "relative",
    left: 0,
    top: 0,
    flex: 10,

    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 2,
  },
});

export default HomeScreen;
