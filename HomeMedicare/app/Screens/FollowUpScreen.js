import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ToastAndroid,
  ScrollView,
} from "react-native";
import AppBar from "../Utility/AppBar";
import { useNavigation } from "@react-navigation/native";
import storeObj from "../Store/storeDataService";
import UpcomingFolloup from "./UpcomingFollowup";
import APIURLUtilities from "../Controller/APIUrlUtilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import jsPDF from "jspdf";
// import "jspdf-autotable";

const FollowupScreen = ({ route }) => {
  const navigation = useNavigation();
  // const readings = JSON.stringify(selectedFollowup.readings);
  const [readingInputValues, setReadingInputValues] = useState({});

  const handleReadingInputChange = (key, value) => {
    setReadingInputValues({
      ...readingInputValues,
      [key]: value,
    });
  };
  // const handleUpdateData = () => {
  //   onDataChange({
  //     readings: formData,
  //   });
  // };

  useEffect(() => {
    // setReadingInputValues(selectedFollowup.readings);
    // console.log(selectedFollowup);
    // const readings = selectedFollowup.readings;
    const readings = {
      bloodPressure: "TRUE",
      temperature: "TRUE",
      sugar: "TRUE",
      Heart: "False",
    };
    setReadingInputValues(readings);
  }, []);

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
    AsyncStorage.getItem(APIURLUtilities.getStorageKey()).then((list) => {
      const data = JSON.parse(list);
      if (data !== null) {
        // console.log(data);
        console.log(selectedFollowup);
        const UpdateFollowupList = data;
        const updateFollowUpIndex = UpdateFollowupList.findIndex(
          (item) => item.followUpId === selectedFollowup.followUpId
        );
        console.log(updateFollowUpIndex);
        console.log(selectedFollowup);
        const Followup = UpdateFollowupList[updateFollowUpIndex];
        console.log(Followup);
        Followup.fieldWorkerRemarks = fieldWorkerRemark;
        Followup.flag = true;
        Followup.readings = readingInputValues;
        console.log(Followup);
        UpdateFollowupList[updateFollowUpIndex] = Followup;
        AsyncStorage.setItem(
          APIURLUtilities.getStorageKey(),
          JSON.stringify(UpdateFollowupList)
        );
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
        <Text style={styles.label}>
          Patient ID: {selectedFollowup.patient.patientId}
        </Text>

        <Text style={styles.label}>
          Patient Name:{selectedFollowup.patient.name}
        </Text>

        <Text style={styles.label}>Gender:{selectedFollowup.patient.sex}</Text>

        <Text style={styles.label}>
          Doctor Remark:{selectedFollowup.doctorRemarks}
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

        {/* {Object.keys(readingInputValues).map((key) => (
            <TextInput
              style={styles.readings}
              key={key}
              value={readingInputValues[key] || ""}
              onChangeText={(value) => handleReadingInputChange(key, value)}
            />
          ))} */}
        <ScrollView
          style={{
            width: 320,
            height: 100,
            backgroundColor: "wheat",
            marginTop: 10,
            borderRadius: 10,
            marginLeft: 10,
          }}
        >
          {Object.entries(readingInputValues).map(([field, value]) => (
            <View
              key={field}
              style={{
                paddingVertical: 40,

                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              {value !== "False" && (
                <>
                  <Text style={{ marginRight: 10 }}>{field}:</Text>
                  <TextInput
                    style={styles.readings}
                    key={field}
                    defaultValue={value}
                    keyboardType="number-pad"
                    onChangeText={(text) =>
                      handleReadingInputChange(field, text)
                    }
                  />
                  <Text style={{ marginRight: 10 }}>unit</Text>
                </>
              )}
            </View>
          ))}
        </ScrollView>
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

    height: 750,
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
  readings: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,

    height: 60,
    width: 80,
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
