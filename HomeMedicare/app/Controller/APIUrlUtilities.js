//Supervisor Menu Options API Child URL Keys...

import AsyncStorage from "@react-native-async-storage/async-storage";

const getFieldWorkerAPIChildURLKeys = () => {
  return {
    fieldWorkerGetFollowupsAPIKey:
      "fieldworker/getFollowUpsForFieldWorkerMobile/",
  };
};

const getStorageKey = () => {
  return "FolloupList";
};

const getLoggedInUserName = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("LoggedInData")
      .then((value) => {
        const userObject = JSON.parse(value);
        const username = userObject.username;
        resolve(username);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAuthToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("LoggedInData")
      .then((value) => {
        const tokenObject = JSON.parse(value);
        const token = tokenObject.token;
        resolve(token);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const APIURLUtilities = {
  getFieldWorkerAPIChildURLKeys,
  getLoggedInUserName,
  getAuthToken,
  getStorageKey,
};

export default APIURLUtilities;
