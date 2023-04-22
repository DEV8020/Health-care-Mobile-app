import React, { useRef, useState } from "react";

import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useNavigation } from "@react-navigation/native";
import OTPInput from "./OTPTextInputs";

const OTPPopUp = ({ visible, setFollowupData, followupData, onVerify }) => {
  const [otp, setOTP] = useState("");
  const [timerKey, setTimerKey] = useState(0);
  const navigation = useNavigation();
  const [otpInputDefault, setOtpInputDefault] = useState(false);

  //OTP timer
  const OTP_TIMER = 2000;

  const secondTextInput = useRef(null);
  const thirdTextInput = useRef(null);
  const fourthTextInput = useRef(null);
  const fifthTextInput = useRef(null);
  // const sixthTextInput = useRef(null);

  //handle verify button
  const handleVerifyOTP = () => {
    // Verify the OTP
    const ServerOTP = followupData.otp;
    // const ServerOTP = "1234";
    setOtpInputDefault(true);
    if (ServerOTP === otp) {
      onVerify();
      navigation.replace("Followup", { selectedFollowup: followupData });

      setOTP("");
      setTimerKey(timerKey + 1);
    } else {
      setOTP("");
      ToastAndroid.show("Invalid OTP", ToastAndroid.SHORT);
    }
  };

  const handleCancelOTP = () => {
    setOtpInputDefault(true);
    navigation.goBack();
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
          <CountdownCircleTimer
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
          >
            {({ remainingTime, animatedColor }) => (
              <Text
                style={[styles.OTP_timeRemaining_txt, { color: animatedColor }]}
              >
                {remainingTime}s
              </Text>
            )}
          </CountdownCircleTimer>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  OTP_outer_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  OTP_inner_container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  OTP_header_txt: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  OTP_buttons: {
    width: 130,
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

{
  /*  <TextInput
            style={styles.OTP_textInput}
            placeholder="OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOTP}
            maxLength={4}
          /> 
       
            <TextInput
              style={styles.OTP_textInput}
              placeholder="-"
              keyboardType="numeric"
              value={otp[0]}
              onChangeText={(text) => {
                setOTP(text + otp.slice(1));
                if (text.length === 1) {
                  secondTextInput.current.focus();
                }
              }}
              maxLength={1}
            />
            <TextInput
              style={styles.OTP_textInput}
              placeholder="-"
              keyboardType="numeric"
              value={otp[1]}
              onChangeText={(text) => {
                setOTP(otp.slice(0, 1) + text + otp.slice(2));
                if (text.length === 1) {
                  thirdTextInput.current.focus();
                }
              }}
              maxLength={1}
              ref={secondTextInput}
            />
            <TextInput
              style={styles.OTP_textInput}
              placeholder="-"
              keyboardType="numeric"
              value={otp[2]}
              onChangeText={(text) => {
                setOTP(otp.slice(0, 2) + text + otp.slice(3));
                if (text.length === 1) {
                  fourthTextInput.current.focus();
                }
              }}
              maxLength={1}
              ref={thirdTextInput}
            />
            <TextInput
              style={styles.OTP_textInput}
              placeholder="-"
              keyboardType="numeric"
              value={otp[3]}
              onChangeText={(text) => {
                setOTP(otp.slice(0, 3) + text + otp.slice(4));
                // if (text.length === 1) {
                //   fifthTextInput.current.focus();
                // }
              }}
              maxLength={1}
              ref={fourthTextInput}
            />
            {/* <TextInput
            style={styles.OTP_textInput}
            placeholder="-"
            keyboardType="numeric"
            value={otp[4]}
            onChangeText={(text) => {
              setOTP(otp.slice(0, 4) + text + otp.slice(5));
              if (text.length === 1) {
                sixthTextInput.current.focus();
              }
            }}
            maxLength={1}
            ref={fifthTextInput}
          />
          <TextInput
            style={styles.OTP_textInput}
            placeholder="-"
            keyboardType="numeric"
            value={otp[5]}
            onChangeText={(text) => {
              setOTP(otp.slice(0, 5) + text + otp.slice(6));
            }}
            maxLength={1}
            ref={sixthTextInput}
          /> */
}
