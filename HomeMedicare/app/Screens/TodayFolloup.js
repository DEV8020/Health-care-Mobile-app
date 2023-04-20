import { FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
//import { DATA } from "../data/dummy-data";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ToastAndroid } from "react-native";
import { useEffect } from "react";
import storeObj from "../Store/storeDataService";

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

    if (item.status === "pending") {
      setShowOTPPopUp(true);
      console.log(item.status);
      ToastAndroid.show("Enter patient OTP", ToastAndroid.SHORT);

      setFollowupData(item);
      console.log(followupData);
    } else {
      console.log("Selected folloup is-" + item.status);
      ToastAndroid.show(
        "Selected folloup is " + item.status,
        ToastAndroid.SHORT
      );
    }
  };

  const renderItem = ({ item }) => {
    if (selectedStatus !== "All" && item.status !== selectedStatus) {
      return null;
    }
    const backgroundColor =
      item.follow_up_id === selectedId ? "#2797F0" : "white";

    let iconColor;
    let iconName;
    switch (item.status) {
      case "pending":
        iconName = "hourglass-empty";
        iconColor = "gray";
        break;
      case "completed":
        iconName = "check-circle";
        iconColor = "green";
        break;
      case "cancelled":
        iconName = "cancel";
        iconColor = "red";
        break;
      default:
        iconName = "info";
        iconColor = "gray";
        break;
    }

    return (
      <TouchableOpacity
        style={{
          backgroundColor,
          padding: 20,
          marginVertical: 4,
          flexDirection: "row",
          width: 400,
          height: 100,
          borderRadius: 10,
        }}
        onPress={() => SelectedPatientHandler(item)}
      >
        <Text style={{ fontSize: 15, padding: 10 }}>{item.title}</Text>
        <Text
          style={{ marginLeft: 40, marginRight: 20, fontSize: 15, padding: 10 }}
        >
          {item.name}
        </Text>
        <Text
          style={{ marginLeft: 40, marginRight: 50, fontSize: 15, padding: 10 }}
        >
          {item.address}
        </Text>
        <Icon name={iconName} size={25} color={iconColor} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.list}
      data={followupList}
      renderItem={renderItem}
      keyExtractor={(item) => item.follow_up_id}
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
    height: 90,
  },
});

export default TodayFolloup;
