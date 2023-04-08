import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const BottomNavigationBar = (props) => {
  const BottomButtonHandler = (type) => {
    props.setFolloupTypeScreen(type);
  };

  return (
    <View style={styles.container_bottom}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => BottomButtonHandler("Past")}
      >
        <Text style={styles.buttonText}>{props.l1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => BottomButtonHandler("Today")}
      >
        <Text style={styles.buttonText}>{props.l2}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
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
    paddingHorizontal: 0,
    paddingVertical: 5,
    backgroundColor: "#2B79E3",
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 15,
    borderWidth: 1,
    borderTopStartRadius:20,
    borderTopEndRadius:20,
    borderColor:"white",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: "100%",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    backgroundColor: "White",
    borderColor:"white",
    borderRadius: 5,
    marginHorizontal: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BottomNavigationBar;
