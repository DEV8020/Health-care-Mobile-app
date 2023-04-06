import { FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
//import { DATA } from "../data/dummy-data";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const DATA = [
  {
    id: "1",
    title: "Patient 1",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-03-2023",
  },
  {
    id: "2",
    title: "Patient 2",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-03-2023",
  },
  {
    id: "3",
    title: "Patient 3",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-03-2023",
  },
  {
    id: "4",
    title: "Patient 4",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-03-2023",
  },
  {
    id: "5",
    title: "Patient 5",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-02-2023",
  },
  {
    id: "6",
    title: "Patient 6",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-02-2023",
  },
  {
    id: "7",
    title: "Patient 7",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-02-2023",
  },
  {
    id: "8",
    title: "Patient 8",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-02-2023",
  },
  {
    id: "9",
    title: "Patient 9",
    name: "ABC",
    address: "ABC",
    status: "completed",
    date: "03-02-2023",
  },
  {
    id: "10",
    title: "Patient 10",
    name: "ABC",
    address: "ABC",
    status: "completed",
    date: "03-02-2023",
  },
  {
    id: "11",
    title: "Patient 11",
    name: "ABC",
    address: "ABC",
    status: "cancelled",
    date: "03-02-2023",
  },
  {
    id: "12",
    title: "Patient 12",
    name: "ABC",
    address: "ABC",
    status: "completed",
    date: "03-01-2023",
  },
  {
    id: "13",
    title: "Patient 13",
    name: "ABC",
    address: "ABC",
    status: "cancelled",
    date: "03-01-2023",
  },
];

function PastFolloup({navigation,selectedStatus}) {
  const [selectedId, setSelectedId] = useState(null);
  const SelectedPatientHandler = (PatientSelectedID) => {
   // setPatientData(PatientSelectedID);
   navigation.navigate("Followup");
  };

  const renderItem = ({ item }) => {
    if (
      selectedStatus !== "All" &&
      item.status !== selectedStatus
    ) {
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
          borderRadius:10,
        }}
        onPress={() => SelectedPatientHandler(item.id)}
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
      data={DATA}
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
