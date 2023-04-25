import storeObj from "../Store/storeDataService";
import GetNewFollowups from "./GetNewFollowups";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FetchLastStoredFollowupId from "../UtilityModules/FetchLastStoredFollowup";
import APIURLUtilities from "./APIUrlUtilities";

var responseHandler;

const StoreNewFollowupsInStorage = async (props) => {
  responseHandler = props.followUpDownLoadResponseHandler;
  const getRequestFollowupResponse = await GetNewFollowups({
    followupListData: FetchLastStoredFollowupId,
    GetFollowupsResponseHandler: GetFollowupsResponseHandler,
  });
};

const GetFollowupsResponseHandler = (response) => {
  // console.log("*******************************");

  // console.log(response);
  if (response.isFollowUpListSuccessfully) {
    // console.log(response.followUpData);

    //Sync Logic Here

    AsyncStorage.getItem(APIURLUtilities.getStorageKey()).then((list) => {
      // parse the retrieved list to a JavaScript object
      if (list === null) {
        console.log("----------------------4");
        AsyncStorage.setItem(
          APIURLUtilities.getStorageKey(),
          JSON.stringify(response.followUpData)
        );
      } else {
        console.log("----------------------1");
        const parsedList = JSON.parse(list);
        console.log("----------------------2");
        // add the new objects to the list
        const updatedList = [...parsedList, ...response.followUpData];
        console.log("----------------------3");
        // convert the updated list back to a string
        const updatedListString = JSON.stringify(updatedList);

        // save the updated list to AsyncStorage
        AsyncStorage.setItem(
          APIURLUtilities.getStorageKey(),
          updatedListString
        );
      }
    });
  } else {
    console.log("response Error");
  }

  responseHandler(response);
};

//followUpDownLoadResponseHandler

// isFollowUpListSuccessfully: true,
//           followUpData: followUpData.responseData.data,
//           errorMessage: null,

// const GetFollowupsResponseHandler = (response) => {
//   // console.log("*******************************");

//   // console.log(response);
//   if (response) {
//     // console.log(response.followUpData);

//     //Sync Logic Here

//     AsyncStorage.getItem("FollowupData").then((list) => {
//       // parse the retrieved list to a JavaScript object
//       if (list !== null) {
//         // console.log("----------------------1");
//         const parsedList = JSON.parse(list);
//         // console.log("----------------------2");
//         // add the new objects to the list
//         const updatedList = [...parsedList, ...response.followUpData];
//         // console.log("----------------------3");
//         // convert the updated list back to a string
//         const updatedListString = JSON.stringify(updatedList);

//         // save the updated list to AsyncStorage
//         AsyncStorage.setItem("FollowupData", updatedListString);
//       } else {
//         AsyncStorage.setItem(
//           "FollowupData",
//           JSON.stringify(response.followUpData)
//         );
//       }
//     });
//   } else {
//     console.log("response Error");
//   }
// };

//        StoreNewFollowupsInStorage(followUpDownLoadResponseHandler : followUpDownLoadResponseHandler);

// GlobalServiceHandler

// const StoreNewFollowupsInStorage = async (props) => {
//   console.log("RegisterNewPatientAPICall");
//   console.log(props.patientData);

//   await  GlobalServiceHandler.h({
//     childURL:
//       APIURLUtilities.getFrontDeskAPIChildURLKeys()
//         .frontDeskPatientRegistrationAPIKey,
//     postData: props.patientData,
//     responseDataHandler: (registerNewPatientResponseData) => {
//       console.log("registerNewPatientResponseData");
//       console.log(registerNewPatientResponseData);
//       if (registerNewPatientResponseData.responseError === null) {
//         props.registerNewPatientResponseCallBack({
//           isNewPatientAdded: true,
//           NewPatientData: registerNewPatientResponseData.responseData.data,
//           errorMessage: null,
//         });
//       } else if (registerNewPatientResponseData.responseData === null) {
//         props.registerNewPatientResponseCallBack({
//           isNewPatientAdded: false,
//           NewPatientData: null,
//           errorMessage: registerNewPatientResponseData.responseError.message,
//         });
//       }
//     },
//   });
// };

export default StoreNewFollowupsInStorage;
