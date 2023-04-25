import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";
//import { DATA } from "../data/dummy-data";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import storeObj from "../Store/storeDataService";

const DATA = [
  {
    id: "1",
    title: "Patient 1",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "2",
    title: "Patient 2",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "3",
    title: "Patient 3",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "4",
    title: "Patient 4",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "5",
    title: "Patient 5",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "6",
    title: "Patient 6",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "7",
    title: "Patient 7",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "8",
    title: "Patient 8",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "9",
    title: "Patient 9",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "10",
    title: "Patient 10",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "11",
    title: "Patient 11",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "12",
    title: "Patient 12",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
  {
    id: "13",
    title: "Patient 13",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
  },
];

function UpcomingFolloup({
  navigation,
  selectedStatus,
  followupData,
  setFollowupData,
  showOTPPopUp,
  setShowOTPPopUp,
  followupList,
}) {
  const [selectedId, setSelectedId] = useState(null);
  // const SelectedPatientHandler = () => {
  //   // setPatientData(PatientSelectedID);
  //   ToastAndroid.show("Followup will be available on registered date");
  // };
  // const [Data, setData] = useState({});
  // useEffect(() => {
  //   storeObj.getData("Followups").then((data) => {
  //     if (data !== null) {
  //       console.log(data);
  //       setData(data);
  //       console.log(Data);
  //     } else {
  //       console.log("empty");
  //       return false;
  //     }
  //   });
  // }, []);

  const SelectedPatientHandler = (item) => {
    // setPatientData(PatientSelectedID);

    if (item.flag === false) {
      ToastAndroid.show(
        "Followup is unavailable currently",
        ToastAndroid.SHORT
      );

      setFollowupData(item);
      console.log(followupData);
    } else {
      console.log("Selected folloup is-" + item.flag);
      ToastAndroid.show("Selected folloup is " + item.flag, ToastAndroid.SHORT);
    }
  };

  const renderItem = ({ item }) => {
    if (selectedStatus !== "All" && item.flag !== selectedStatus) {
      return null;
    }
    const backgroundColor = item.id === selectedId ? "#2797F0" : "white";

    let iconColor;
    let iconName;
    switch (item.flag) {
      case false:
        iconName = "hourglass-empty";
        iconColor = "gray";
        break;
      case true:
        iconName = "check-circle";
        iconColor = "green";
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
      <>
        {item.flag === false && (
          <TouchableOpacity
            style={{
              backgroundColor,
              padding: 20,
              marginVertical: 4,
              flexDirection: "row",
              width: 400,
              height: 100,
            }}
            onPress={() => SelectedPatientHandler(item)}
          >
            <Text style={{ fontSize: 15, padding: 10 }}>{item.followUpId}</Text>
            <Text
              style={{
                marginLeft: 40,
                marginRight: 20,
                fontSize: 15,
                padding: 10,
              }}
            >
              {item.patient.name}
            </Text>
            <Text
              style={{
                marginLeft: 40,
                marginRight: 50,
                fontSize: 15,
                padding: 10,
              }}
            >
              {item.patient.address}
            </Text>
            <Icon name={iconName} size={25} color={iconColor} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <FlatList
      style={styles.list}
      data={followupList}
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
  },
  item: {
    padding: 20,
    marginVertical: 4,

    width: 400,
    height: 90,
  },
});

export default UpcomingFolloup;
