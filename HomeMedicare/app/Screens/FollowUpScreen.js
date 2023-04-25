import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import AppBar from "../Utility/AppBar";
import { useNavigation } from "@react-navigation/native";
import storeObj from "../Store/storeDataService";
import UpcomingFolloup from "./UpcomingFollowup";
import APIURLUtilities from "../Controller/APIUrlUtilities";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

const FollowupScreen = ({ route }) => {
  const navigation = useNavigation();

  const { selectedFollowup } = route.params;

  console.log(selectedFollowup);

  const [fieldWorkerRemark, setFieldWorkerRemark] = useState("");

  // setPatientID(props.selectedID);
  const handlePrintPrescription = () => {
    // const doc = new jsPDF();
    // const jsonData = [
    //   { id: 1, name: "John Doe", email: "example@example.com" },
    //   { id: 2, name: "Jane Doe", email: "example@example.com" },
    //   { id: 3, name: "Bob Smith", email: "example@example.com" },
    // ];
    // doc.autoTable({
    //   head: [["ID", "Name", "Email"]],
    //   body: jsonData.map(({ id, name, email }) => [id, name, email]),
    // });
    // doc.save("table.pdf");
    ToastAndroid.show("Prescription downloaded", ToastAndroid.SHORT);
    // Add logic to print prescription here
  };

  const handleMarkComplete = () => {
    storeObj.getData("Followups").then((data) => {
      if (data !== null) {
        // console.log(data);
        console.log(selectedFollowup);
        const UpdateFollowupList = data;
        const updateFollowUpIndex = UpdateFollowupList.findIndex(
          (item) => item.follow_up_id === selectedFollowup.follow_up_id
        );
        console.log(updateFollowUpIndex);
        console.log(selectedFollowup);
        const Followup = UpdateFollowupList[updateFollowUpIndex];
        console.log(Followup);
        Followup.fieldWorker_remark = fieldWorkerRemark;
        Followup.status = "completed";
        console.log(Followup);
        UpdateFollowupList[updateFollowUpIndex] = Followup;
        storeObj.storeData("Followups", UpdateFollowupList);
        console.log("Success");
        navigation.replace("Home");
      } else {
        console.log("empty");
      }
    });

    // Add logic to mark as complete here
  };

  // follow_up_id: "11",
  // title: "Patient 11",
  // name: "ABC",
  // address: "ABC",
  // status: "cancelled",
  // date: "03-04-2023",
  // last_sync_date:"03-04-2023",

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/bgimg.jpg")}
    >
      {/* <View>
        <AppBar title="Home Medicare"  />
        </View> */}
      <View style={styles.container_Followup}>
        <Text style={styles.label}>Patient ID: {selectedFollowup.title}</Text>

        <Text style={styles.label}>Patient Name:{selectedFollowup.name}</Text>

        <Text style={styles.label}>
          Patient Address:{selectedFollowup.address}
        </Text>

        <Text style={styles.label}>
          Doctor Remark:{selectedFollowup.doctor_remark}
        </Text>

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
