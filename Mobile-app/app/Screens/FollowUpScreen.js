import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import AppBar from "../Utility/AppBar";

const FollowupScreen = (props) => {
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [doctorRemark, setDoctorRemark] = useState("");
  const [fieldWorkerRemark, setFieldWorkerRemark] = useState("");

  // setPatientID(props.selectedID);
  const handlePrintPrescription = () => {
    // Add logic to print prescription here
  };

  const handleMarkComplete = () => {
    // Add logic to mark as complete here
  };
  const backButtonHandler = () => {
    props.setUser("HomeScreen");
  };
  if (props.user !== "FollowupScreen") return null;

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/bgimg.jpg")}
    >
      <View>
        <AppBar title="Home Medicare" user={props.user} setUser={props.setUser} handleLogout={backButtonHandler}/>
        </View>
      <View style={styles.container_Followup}>
        <Text style={styles.label}>Patient ID: 1</Text>

        <Text style={styles.label}>Patient Name:abc</Text>

        <Text style={styles.label}>Patient Address: ABC</Text>

        <Text style={styles.label}>Doctor Remark: ABC</Text>

        <Text style={styles.label}>Field Worker Remark:</Text>
        <TextInput
          style={styles.textArea}
          value={fieldWorkerRemark}
          onChangeText={setFieldWorkerRemark}
          placeholder="Enter field worker remark"
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handlePrintPrescription}
        >
          <Text style={styles.buttonText}>Print Prescription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMarkComplete}>
          <Text style={styles.buttonText}>Mark Complete</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  container_Followup: {
    position: "relative",
    top: 20,
    left: 0,
    marginStart: "5%",
    marginEnd: "5%",
    

    height: 550,
    width: "90%",

    backgroundColor: "white",
    padding: 20,
    flexDirection: "column",
    elevation: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 2,
    shadowRadius: 1,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    minHeight: 100,
  },
  button: {
    backgroundColor: "#2797F0",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default FollowupScreen;
