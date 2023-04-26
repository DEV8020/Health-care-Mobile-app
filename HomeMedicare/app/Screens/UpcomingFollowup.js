import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
  View,
} from "react-native";
//import { DATA } from "../data/dummy-data";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

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
    const isSelected = item.followUpId === selectedId;
    if (selectedStatus !== "All" && item.flag !== selectedStatus) {
      return null;
    }
    // const backgroundColor = item.id === selectedId ? "#2797F0" : "white";
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
              backgroundColor: "white",
              padding: 20,

              marginVertical: 4,
              width: 400,
              height,
              borderRadius: 10,
            }}
            onPress={() => SelectedPatientHandler(item)}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16, padding: 10 }}>
                {item.followUpId}
              </Text>
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
                onPress={() =>
                  setSelectedId(isSelected ? null : item.followUpId)
                }
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
