// import React, { useState } from "react";
// import { View, TextInput, Button, Alert } from "react-native";
// import OTPVerify from "react-native-otp-verify";

// const OTPLoginScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOTP] = useState("");

//   const requestOTP = () => {
//     // TODO: Send a request to the server to generate an OTP and send it to the user's phone number
//     OTPVerify.getHash().then((hash) => {
//       // Send the hash to the server to generate an OTP
//       // The hash can be used to identify the SMS message containing the OTP
//     });
//   };

//   const onOTPReceived = (message) => {
//     // Extract the OTP from the message
//     const regex = /(\d{6})/;
//     const match = message.match(regex);
//     if (match) {
//       setOTP(match[1]);
//     }
//   };

//   const onOTPTimeout = () => {
//     Alert.alert("OTP Retrieval Timeout", "Please try again.");
//   };

//   const onSubmit = () => {
//     // TODO: Send a request to the server to verify the OTP and log in the user
//   };

//   // Register the listener for incoming SMS messages
//   OTPVerify.getOtp()
//     .then((message) => onOTPReceived(message))
//     .catch((error) => console.log(error));

//   return (
//     <View>
//       <TextInput
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         placeholder="Phone Number"
//       />
//       <Button title="Request OTP" onPress={requestOTP} />
//       <TextInput value={otp} onChangeText={setOTP} placeholder="OTP" />
//       <Button title="Submit" onPress={onSubmit} />
//     </View>
//   );
// };

// export default OTPLoginScreen;
