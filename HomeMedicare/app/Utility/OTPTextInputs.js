import React, { useEffect, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const OTPInput = ({
  length,
  value,
  onChange,
  otpInputDefault,
  setOtpInputDefault,
}) => {
  const inputRefs = useRef([]);
  useEffect(() => {
    if (otpInputDefault === true) {
      inputRefs.current[0].focus();
      setOtpInputDefault(false);
    }
  }, [otpInputDefault]);

  const handleOnChange = (index, text) => {
    const newValues = [...value];
    newValues[index] = text;
    onChange(newValues.join(""));
    if (text.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    const key = event.nativeEvent.key;
    if (key === "Backspace") {
      if (value[index]) {
        handleOnChange(index, "");
      } else if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
        handleOnChange(index - 1, "");
      }
    } else if (/^\d+$/.test(key)) {
      handleOnChange(index, key);
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const renderInputs = () => {
    const otpInputs = [];
    for (let i = 0; i < length; i++) {
      otpInputs.push(
        <TextInput
          key={i}
          style={styles.OTP_textInput}
          keyboardType="numeric"
          value={value[i]}
          onChangeText={(text) => handleOnChange(i, text)}
          maxLength={1}
          ref={(ref) => {
            inputRefs.current[i] = ref;
          }}
          onKeyPress={(event) => handleKeyPress(event, i)}
        />
      );
    }
    return <View style={styles.otp_pin_type_Container}>{otpInputs}</View>;
  };

  return renderInputs();
};
const styles = StyleSheet.create({
  otp_pin_type_Container: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  OTP_textInput: {
    textAlign: "center",
    width: 40,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",

    padding: 10,
    marginBottom: 20,
  },
});

export default OTPInput;
