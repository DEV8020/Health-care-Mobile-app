import React, { useRef, useState } from "react";

import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useNavigation } from "@react-navigation/native";
import OTPInput from "./OTPTextInputs";

const OTPPopUp = ({ visible, setShowOTPPopUp, followupData, onVerify }) => {
  const [otp, setOTP] = useState("");
  const [timerKey, setTimerKey] = useState(0);
  const navigation = useNavigation();
  const [otpInputDefault, setOtpInputDefault] = useState(false);

  //OTP timer
  // const OTP_TIMER = 2000;

  const secondTextInput = useRef(null);
  const thirdTextInput = useRef(null);
  const fourthTextInput = useRef(null);
  const fifthTextInput = useRef(null);
  // const sixthTextInput = useRef(null);

  //handle verify button
  const handleVerifyOTP = () => {
    // Verify the OTP
    // const ServerOTP = followupData.otp;
    const ServerOTP = "1234";
    setOtpInputDefault(true);
    if (ServerOTP === otp) {
      onVerify();
      navigation.navigate("Followup", { selectedFollowup: followupData });

      setOTP("");
      setTimerKey(timerKey + 1);
    } else {
      setOTP("");
      ToastAndroid.show("Invalid OTP", ToastAndroid.SHORT);
    }
  };

  const handleCancelOTP = () => {
    setOtpInputDefault(true);
    // navigation.replace("Home");
    setShowOTPPopUp(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.OTP_outer_container}>
        <View style={styles.OTP_inner_container}>
          <Text style={styles.OTP_header_txt}>Enter OTP for this followup</Text>
          <OTPInput
            length={4}
            value={otp}
            onChange={setOTP}
            setOtpInputDefault={setOtpInputDefault}
            otpInputDefault={otpInputDefault}
          />
          {/* <CountdownCircleTimer
            key={timerKey}
            isPlaying={visible}
            duration={OTP_TIMER}
            colors="#007AFF"
            onComplete={() => {
              // console.log("On Complete");
              ToastAndroid.show(
                "OTP timer expired try again",
                ToastAndroid.SHORT
              );
              navigation.goBack();
            }}
          > */}
          {/* {({ remainingTime, animatedColor }) => (
              <Text
                style={[styles.OTP_timeRemaining_txt, { color: animatedColor }]}
              >
                {remainingTime}s
              </Text>
            )}
          </CountdownCircleTimer> */}
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              style={styles.OTP_buttons}
              onPress={handleVerifyOTP}
            >
              <Text style={styles.OTP_buttons_txt}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.OTP_buttons}
              onPress={handleCancelOTP}
            >
              <Text style={styles.OTP_buttons_txt}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  OTP_outer_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C3E50",
    opacity: 0.85,
  },
  OTP_inner_container: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    opacity: 1,
    alignItems: "center",
  },
  OTP_header_txt: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  OTP_buttons: {
    width: 180,
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    marginTop: 50,
    justifyContent: "center",
  },
  OTP_buttons_txt: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  OTP_timeRemaining_txt: {
    fontSize: 16,
    fontWeight: "bold",
    // color: animatedColor,
  },
});

export default OTPPopUp;
