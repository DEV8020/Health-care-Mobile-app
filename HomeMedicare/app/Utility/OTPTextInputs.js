import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const OTPInput = ({
  length,
  value,
  onChange,
  otpInputDefault,
  setOtpInputDefault,
}) => {
  const [isFocused, setIsFocused] = useState(-1);
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
        setIsFocused(false);
        handleOnChange(index - 1, "");
      }
    } else if (/^\d+$/.test(key)) {
      handleOnChange(index, key);
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
        // setIsFocused(true);
      }
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const renderInputs = () => {
    const otpInputs = [];
    for (let i = 0; i < length; i++) {
      otpInputs.push(
        <TextInput
          key={i}
          secureTextEntry={true}
          onFocus={() => setIsFocused(i)}
          style={[
            styles.OTP_textInput,
            { borderColor: isFocused ? "blue" : "gray" },
          ]}
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
    marginLeft: 30,
  },
  OTP_textInput: {
    textAlign: "center",
    width: 45,
    marginHorizontal: 10,
    borderWidth: 1,

    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default OTPInput;
