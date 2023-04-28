import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
//import { DATA } from "../data/dummy-data";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ToastAndroid } from "react-native";
import { useEffect } from "react";
import moment from "moment";

function TodayFolloup({
  followupList,
  navigation,
  selectedStatus,
  followupData,
  setFollowupData,
  showOTPPopUp,
  setShowOTPPopUp,
}) {
  const [selectedId, setSelectedId] = useState(null);

  const SelectedPatientHandler = (item) => {
    // setPatientData(PatientSelectedID);

    if (item.flag === false) {
      setShowOTPPopUp(true);
      console.log(item.flag);
      ToastAndroid.show("Enter patient OTP", ToastAndroid.SHORT);

      setFollowupData(item);
      console.log(followupData);
    } else {
      console.log("Selected folloup is completed");
      ToastAndroid.show("Selected folloup is completed ", ToastAndroid.SHORT);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = item.followUpId === selectedId;
    if (
      selectedStatus !== "All" &&
      selectedStatus !== "synced" &&
      item.flag !== selectedStatus
    ) {
      return null;
    }
    if (
      selectedStatus !== "All" &&
      selectedStatus === "synced" &&
      item.isFollowUpSynced === false
    ) {
      return null;
    }
    // const backgroundColor = item.followupId === selectedId ? "blue" : "white";
    const height = isSelected ? 200 : 90;
    let iconColor;
    let iconName;
    switch (item.flag) {
      case false:
        iconName = "hourglass-empty";
        iconColor = "gray";
        break;
      case true:
        iconName = "check-circle";
        iconColor = item.isFollowUpSynced ? "green" : "#D68910";
        break;
      // case "cancelled":
      //   iconName = "cancel";
      //   iconColor = "red";
      //   break;
      default:
        iconName = "info";
        iconColor = "gray";
        break;
    }

    return (
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 20,

          marginVertical: 4,
          width: 400,
          height,
          borderRadius: 10,
        }}
        onPress={() => SelectedPatientHandler(item)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, padding: 10 }}>{item.followUpId}</Text>
          <Text
            style={{
              fontSize: 16,
              padding: 10,
            }}
          >
            {item.patient.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              padding: 10,
            }}
          >
            {moment(item.date).format("DD-MM-YYYY")}
          </Text>

          <Icon name={iconName} size={25} color={iconColor} />
          <TouchableOpacity
            style={{ height: 35, width: 30, backgroundColor: "white" }}
            onPress={() => setSelectedId(isSelected ? null : item.followUpId)}
          >
            {/* <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                >
                  {isSelected ? "Hide details" : "Show details"}
                </Text> */}
            <Icon
              name={isSelected ? "arrow-drop-up" : "arrow-drop-down"}
              size={40}
              color="#2B79E3"
              style={{ flex: 1 }}
            />
          </TouchableOpacity>
        </View>

        {isSelected && (
          <View
            style={{
              justifyContent: "space-between",
              backgroundColor: "wheat",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                marginLeft: 15,
                marginRight: 15,
                fontSize: 16,
                padding: 10,
              }}
            >
              Address : {item.patient.address}
            </Text>
            <Text
              style={{
                marginLeft: 15,
                marginRight: 15,
                fontSize: 16,
                padding: 10,
              }}
            >
              pin code : {item.patient.pincode}
            </Text>
            <Text
              style={{
                marginLeft: 15,
                marginRight: 15,
                fontSize: 16,
                padding: 10,
              }}
            >
              Contact No : {item.patient.contact}
            </Text>
            {/* additional fields... */}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.list}
      data={followupList.sort((a, b) => a.flag - b.flag)}
      renderItem={renderItem}
      keyExtractor={(item) => item.followUpId}
      extraData={selectedId}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "90%",

    borderColor: "white",
  },
  item: {
    padding: 20,
    marginVertical: 4,

    width: 400,
    height: 200,
  },
});

export default TodayFolloup;
