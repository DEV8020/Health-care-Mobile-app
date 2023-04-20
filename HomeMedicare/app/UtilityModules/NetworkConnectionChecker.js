import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const checkNetworkConnection = async () => {
  var NetworkCheck = await NetInfo.fetch().then((state) => {
    console.log("Connection type:", state.type);
    console.log("Is connected?", state.isConnected);
    return state.isConnected;
  });
  return NetworkCheck;
};

export default checkNetworkConnection;
