import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { setData } from "./redux/actions";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TestApp = () => {
  //   const dispatch = useDispatch();
  //   const data = useSelector((state) => state.data);

  const fetchData = async () => {
    const storedData = await AsyncStorage.getItem("Followups");
    const parsedData = JSON.parse(storedData);
    const sendLimit = 5;
    for (let i = 0; i < followups.length; i += sendLimit) {
      const dataToSend = followups.slice(i, i + sendLimit); // get first 5 items from stored data

      sendDataToServer(dataToSend);
    }
  };

  const sendDataToServer = async (data) => {
    console.log("Data being sent to server:", data);
    // Code to send data to server
  };

  const handleButtonPress = () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        fetchData();
      } else {
        console.log("Network error");
      }
    });
    return () => {
      unsubscribe();
    };
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{JSON.stringify(data)}</Text>
      <Button title="Send to server" onPress={handleButtonPress} />
    </View>
  );
};

export default TestApp;
