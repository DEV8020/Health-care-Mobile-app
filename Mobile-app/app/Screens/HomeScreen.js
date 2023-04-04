import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import TodayFolloup from "./TodayFolloup";
import PastFolloup from "./PastFollowup";
import UpcomingFolloup from "./UpcomingFollowup";

const HomeScreen = (props) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [folloupTypeScreen, setFolloupTypeScreen] = useState("Today");

  const Header = () => {
    return (
      <View style={styles.header}>
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
    props.setUser("logout");
  };

  const filterOptions = ["All", "pending", "completed", "cancelled"];

  if (props.user !== "HomeScreen") return null;
  return (
    <ImageBackground
      style={styles.container_Home}
      source={require("../assets/bgimg.jpg")}
    >
      
        <AppBar
          title="Home Medicare"
          handleLogout={LogoutHandler}
          user={props.user}
          setUser={props.setUser} />
      
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedStatus}
          // style={{ backgroundColor: "white",borderTopRadius: 20, }}
          style={{backgroundColor:"white",borderRadius:20 }}
        itemStyle={{ color: 'blue', fontSize: 18 ,borderStartRadius: 20}}
          onValueChange={(itemValue) => setSelectedStatus(itemValue)}
        >
          {filterOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
      <View style={styles.container_list}>
        <Header />
        {folloupTypeScreen === "Today" && (
          <TodayFolloup
            setUser={props.setUser}
            setPatientData={props.setPatientData}
            selectedStatus={selectedStatus}
          />
        )}
        {folloupTypeScreen === "Past" && (
          <PastFolloup
            setUser={props.setUser}
            setPatientData={props.setPatientData}
            selectedStatus={selectedStatus}
          />
        )}
        {folloupTypeScreen === "Upcoming" && (
          <UpcomingFolloup
            setUser={props.setUser}
            setPatientData={props.setPatientData}
            selectedStatus={selectedStatus}
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
    borderTopStartRadius:20,
    borderTopEndRadius:20,
    borderColor:"white",
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

  filterContainer: {
    flex: 0.5,
    height: 10,
    width: "50%",
    marginTop: 20,
    left: 95,
  },

  filterPicker: {
    borderWidth: 1,
    borderColor: "#2797F0",
    borderRadius: 20,
    backgroundColor: "white",
  },
});
export default HomeScreen;
