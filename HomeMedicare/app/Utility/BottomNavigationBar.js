import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const BottomNavigationBar = (props) => {
  const [activeButton, setActiveButton] = useState("Past");

  const BottomButtonHandler = (type) => {
    setActiveButton(type);
    props.setFolloupTypeScreen(type);
  };

  const getButtonStyle = (buttonType) => {
    return [styles.button, activeButton === buttonType && styles.activeButton];
  };

  return (
    <View style={styles.container_bottom}>
      <TouchableOpacity
        style={getButtonStyle("Past")}
        onPress={() => BottomButtonHandler("Past")}
      >
        <Text style={styles.buttonText}>{props.l1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={getButtonStyle("Today")}
        onPress={() => BottomButtonHandler("Today")}
      >
        <Text style={styles.buttonText}>{props.l2}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={getButtonStyle("Upcoming")}
        onPress={() => BottomButtonHandler("Upcoming")}
      >
        <Text style={styles.buttonText}>{props.l3}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container_bottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,

    borderColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: "100%",
    height: "90%",
  },
  activeButton: {
    borderTopWidth: 3,
    elevation: 2,
    backgroundColor: "#2676E3",
  },
  button: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#2B79E3",
    borderColor: "white",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BottomNavigationBar;
