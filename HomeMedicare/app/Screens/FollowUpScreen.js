import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ToastAndroid,
  FlatList,
  PermissionsAndroid,
} from "react-native";
import AppBar from "../Utility/AppBar";
import { useNavigation } from "@react-navigation/native";
import storeObj from "../Store/storeDataService";
import UpcomingFolloup from "./UpcomingFollowup";
import APIURLUtilities from "../Controller/APIUrlUtilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import PDFView from "react-native-pdf";
// import RNFS from "react-native-fs";

// import jsPDF from "jspdf";
// import "jspdf-autotable";

const FollowupScreen = ({ route }) => {
  const navigation = useNavigation();
  // const readings = JSON.stringify(selectedFollowup.readings);
  const [readingInputValues, setReadingInputValues] = useState({});
  const [fieldWorkerRemark, setFieldWorkerRemark] = useState("");
  const [isAllFieldsSet, setIsAllFieldsSet] = useState(false);

  const handleReadingInputChange = (key, value) => {
    // const NumValue = parseFloat(value);
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
    // value.replace(/\D/g, "");
    console.log("called%555555555555555555555555555555555");
    // const hasNumericValue = Object.entries(readingInputValues)
    //   .map(([key, value]) => {
    //     if (value === "FALSE" || value === "TRUE") {
    //       return null;
    //     }
    //     console.log(typeof value);
    //     const numericValue = parseFloat(value);
    //     console.log(typeof numericValue);

    //     return isNaN(numericValue) ? null : numericValue;
    //   })
    //   .every(
    //     (value) =>
    //       console.log(typeof value) &&
    //       value !== null &&
    //       typeof value === "number"
    //   );
    const hasNumericValue = Object.values(readingInputValues).every(
      (value) => value === "FALSE" || !isNaN(parseFloat(value))
    );

    console.log(hasNumericValue);
    if (fieldWorkerRemark !== "" && hasNumericValue) {
      setIsAllFieldsSet(true);
    } else {
      setIsAllFieldsSet(false);
    }
  }, [readingInputValues, fieldWorkerRemark]);

  useEffect(() => {
    setReadingInputValues(selectedFollowup.readings);
    // console.log(selectedFollowup);
    const readings = selectedFollowup.readings;
    // const readings = {
    //   bloodPressure: "TRUE",
    //   temperature: "TRUE",
    //   sugar: "TRUE",
    //   Heart: "TRUE",
    // };
    setReadingInputValues(readings);
  }, []);

  const { selectedFollowup } = route.params;

  // console.log(selectedFollowup);

  // setPatientID(props.selectedID);
  const handlePrintPrescription = async () => {
    // if (Platform.OS === "android") {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //     {
    //       title: "Storage Permission Required",
    //       message: "This app needs permission to save files to your device.",
    //     }
    //   );

    //   if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    //     // Permission not granted, exit the function
    //     return;
    //   }
    // }
    // const pdfData = await PDFView.convert({
    //   html: `
    //     <html>
    //       <head>
    //         <style>
    //           /* Add any custom styles to your PDF */
    //         </style>
    //       </head>
    //       <body>
    //         ${Object.entries(readingInputValues)
    //           .map(
    //             ([word, definition]) => `<p><b>${word}</b>: ${definition}</p>`
    //           )
    //           .join("")}
    //       </body>
    //     </html>
    //   `,
    //   fileName: "prescription.pdf",
    // });
    // const filePath = `${RNFS.DocumentDirectoryPath}/dictionary.pdf`;
    // await RNFS.writeFile(filePath, pdfData, "base64");
    ToastAndroid.show("Prescription downloaded", ToastAndroid.SHORT);
    // Add logic to print prescription here
  };

  const handleMarkComplete = () => {
    AsyncStorage.getItem(APIURLUtilities.getStorageKey()).then((list) => {
      const data = JSON.parse(list);
      if (data !== null) {
        // console.log(data);
        // console.log(selectedFollowup);
        const UpdateFollowupList = data;
        const updateFollowUpIndex = UpdateFollowupList.findIndex(
          (item) => item.followUpId === selectedFollowup.followUpId
        );
        // console.log(updateFollowUpIndex);
        // console.log(selectedFollowup);
        const Followup = UpdateFollowupList[updateFollowUpIndex];
        // console.log(Followup);
        Followup.fieldWorkerRemarks = fieldWorkerRemark;
        Followup.flag = true;
        Followup.readings = readingInputValues;
        // console.log(Followup);
        UpdateFollowupList[updateFollowUpIndex] = Followup;
        AsyncStorage.setItem(
          APIURLUtilities.getStorageKey(),
          JSON.stringify(UpdateFollowupList)
        );
        // console.log("Success");
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
  // const sortByProperty = (property) => {
  //   return function (a, b) {
  //     if (a[property] < b[property]) {
  //       return -1;
  //     }
  //     if (a[property] > b[property]) {
  //       return 1;
  //     }
  //     return 0;
  //   };
  // };

  // useEffect(() => {
  //   const sortedData = data.sort(sortByProperty('propertyName'));
  //   setReadingInputValues(sortedData);
  // }, [data]);

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
          Patient Name: {selectedFollowup.patient.name}
        </Text>

        <Text style={styles.label}>Gender: {selectedFollowup.patient.sex}</Text>

        <Text style={styles.label}>
          Doctor Remark: {selectedFollowup.doctorRemarks}
        </Text>

        <Text style={styles.label}>Field Worker Remark: </Text>
        <TextInput
          style={styles.textArea}
          value={fieldWorkerRemark}
          onChangeText={setFieldWorkerRemark}
          placeholder="Enter your remark"
          multiline
          numberOfLines={5}
        />

        {/* {Object.keys(readingInputValues).map((key) => (
            <TextInput
              style={styles.readings}
              key={key}
              value={readingInputValues[key] || ""}
              onChangeText={(value) => handleReadingInputChange(key, value)}
            />
          ))} */}

        {/* <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.field}
          style={{
            flex: 1,
            width: 330,
            height: 250,
            backgroundColor: "wheat",
            marginTop: 10,
            borderRadius: 10,
          }}
          keyboardDismissMode="on-drag"
        /> */}
        <FlatList
          data={Object.entries(readingInputValues).sort((a, b) =>
            a[0].localeCompare(b[0])
          )}
          style={{
            flex: 1,
            marginTop: 10,
            borderRadius: 15,
            backgroundColor: "wheat",
            padding: 10,
          }}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => {
            const [field, value] = item;
            if (value === "FALSE") {
              return null;
            }
            return (
              <View
                style={{
                  paddingVertical: 20,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginRight: 10, width: 120, fontSize: 16 }}>
                  {field}:
                </Text>
                <TextInput
                  style={styles.readings}
                  defaultValue={value === "TRUE" ? "" : value}
                  keyboardType="numeric"
                  onChangeText={(text) => handleReadingInputChange(field, text)}
                />
                {/* <Text style={{ marginRight: 10 }}>unit</Text> */}
              </View>
            );
          }}
        />
        {/*         
          {/* <ScrollView style={{ flexGrow: 1 }}>
            {Object.entries(readingInputValues).map(([field, value]) => (
              <View key={field} style={{ paddingHorizontal: 20, flex: 1 }}>
                {value !== "False" && (
                  <View
                    style={{
                      position: "relative",
                      top: 0,
                      left: 0,
                      right: 0,
                      paddingVertical: 20,

                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text style={{ marginRight: 10, width: 120, fontSize: 16 }}>
                      {field}:
                    </Text>
                    <TextInput
                      style={styles.readings}
                      key={field}
                      defaultValue={value === "TRUE" ? "" : value}
                      keyboardType="number-pad"
                      onChangeText={(text) =>
                        handleReadingInputChange(field, text)
                      }
                    />
                    {/* <Text style={{ marginRight: 10 }}>unit</Text> */}
        {/* </View>
                )}
              </View>
            ))}
          </ScrollView> */}

        <TouchableOpacity
          style={styles.button}
          onPress={handlePrintPrescription}
        >
          <Text style={styles.buttonText}>Print Prescription</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button_mark_complete,
            { backgroundColor: isAllFieldsSet ? "#2797F0" : "#2C79B6" },
          ]}
          onPress={handleMarkComplete}
          disabled={!isAllFieldsSet}
        >
          <Text style={styles.buttonText}>Mark Complete</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    width: 120,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 10,
    paddingRight: 10,
  },
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
    padding: 10,
    marginTop: 8,
    minHeight: 100,
  },
  readings: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,

    height: 40,
    width: 60,
  },
  button: {
    backgroundColor: "#2797F0",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  button_mark_complete: {
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
