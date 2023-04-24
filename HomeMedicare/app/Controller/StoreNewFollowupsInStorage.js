import storeObj from "../Store/storeDataService";
import GetNewFollowups from "./GetNewFollowups";
import FetchLastStoredFollowupId from "../UtilityModules/FetchLastStoredFollowup";

const StoreNewFollowupsInStorage = async (props) => {
  const getRequestFollowupResponse = await GetNewFollowups({
    followupListData: FetchLastStoredFollowupId,
    GetFollowupsResponseHandler: GetFollowupsResponseHandler,
  });
};

const GetFollowupsResponseHandler = (response) => {
  console.log("*******************************");
  if (response) {
    console.log(response.data);

    //Sync Logic Here

    //   storeObj.storeData("Followups", getRequestFollowupResponse);
  } else {
    console.log("response Error");
  }
};

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
