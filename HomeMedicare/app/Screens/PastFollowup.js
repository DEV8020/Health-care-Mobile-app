import { FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
//import { DATA } from "../data/dummy-data";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ToastAndroid } from "react-native";
import { useEffect } from "react";
import storeObj from "../Store/storeDataService";

function PastFolloup({
  navigation,
  selectedStatus,
  showOTPPopUp,
  setShowOTPPopUp,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [Data, setData] = useState({});
  useEffect(() => {
    storeObj.getData("Followups").then((data) => {
      if (data !== null) {
        console.log(data);
        setData(data);
        console.log(Data);
      } else {
        console.log("empty");
        return false;
      }
    });
  }, []);

  const SelectedPatientHandler = (item) => {
    if (item.status === "pending") {
      setShowOTPPopUp(true);
      console.log(item.status);
      ToastAndroid.show("Enter patient OTP", ToastAndroid.SHORT);
      if (showOTPPopUp) {
        navigation.navigate("Followup");
      } else {
        console.log("OTP failed in Today followup");
      }
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
    const backgroundColor = item.status === "pending" ? "#F1948A" : "white";

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
          style={{ marginLeft: 10, marginRight: 10, fontSize: 15, padding: 10 }}
        >
          {item.name}
        </Text>
        <Text
          style={{ marginLeft: 10, marginRight: 10, fontSize: 15, padding: 10 }}
        >
          {item.address}
        </Text>
        <Text
          style={{ marginLeft: 10, marginRight: 20, fontSize: 15, padding: 10 }}
        >
          {item.date}
        </Text>
        <Icon name={iconName} size={25} color={iconColor} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.list}
      data={Data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedId}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "90%",
  },
  item: {
    padding: 20,
    marginVertical: 4,

    width: 400,
    height: 90,
  },
});

export default PastFolloup;
