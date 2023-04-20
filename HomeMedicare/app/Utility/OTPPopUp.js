import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useNavigation } from "@react-navigation/native";

const OTPPopUp = ({ visible, setFollowupData,followupData,onVerify }) => {
  const [otp, setOTP] = useState("");
  const [timerKey, setTimerKey] = useState(0);
  const navigation = useNavigation();

  const handleVerify = () => {
    // Verify the OTP
    const ServerOTP = "1234";
    if (ServerOTP === otp) {
        onVerify();
      navigation.replace("Followup",{selectedFollowup:followupData});

      setOTP("");
      setTimerKey(timerKey + 1);
    } else {
      ToastAndroid.show("Invalid OTP", ToastAndroid.SHORT);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20 }}>
            Enter OTP for this followup
          </Text>
          <TextInput
            style={{
              textAlign: "center",
              width: 150,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 20,
            }}
            placeholder="OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOTP}
          />
          <CountdownCircleTimer
            key={timerKey}
            isPlaying={visible}
            duration={30}
            colors="blue"
            onComplete={() => {
              ToastAndroid.show("otp expired");
              navigation.goBack();
            }}
          >
            {({ remainingTime, animatedColor }) => (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: animatedColor,
                }}
              >
                {remainingTime}s
              </Text>
            )}
          </CountdownCircleTimer>
          <TouchableOpacity
            style={{
              width: 120,
              backgroundColor: "#007AFF",
              borderRadius: 5,
              padding: 10,
              marginTop: 50,
            }}
            onPress={handleVerify}
          >
            <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OTPPopUp;
