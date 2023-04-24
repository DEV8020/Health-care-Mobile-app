// import { sendItemsToServer } from "../Store/Redux/actions";
import GlobalServiceHandler from "./GlobalServiceController";
import APIURLUtilities from "./APIUrlUtilities";

const GetNewFollowups = async (props) => {
  console.log("GetSuperAdminAllRegisteredUserList");

  var folloupID = props.followupID;

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL:
      APIURLUtilities.getFrontDeskAPIChildURLKeys()
        .frontDeskGetPatientsDetailAPIKey + patientID,
    responseDataHandler: (getPatientDetailsServiceData) => {
      console.log("getPatientDetailsServiceData");
      console.log(getPatientDetailsServiceData);
      if (getPatientDetailsServiceData.responseError === null) {
        props.getPatientDetailsResponseHandler({
          isPatientDetailsRecievedSuccessFully: true,
          patientDetailsData: getPatientDetailsServiceData.responseData.data,
          errorMessage: null,
        });
      } else if (getPatientDetailsServiceData.responseData === null) {
        props.getPatientDetailsResponseHandler({
          isPatientDetailsRecievedSuccessFully: false,
          patientDetailsData: null,
          errorMessage: getPatientDetailsServiceData.responseError.message,
        });
      }
    },
  });
};

export default GetNewFollowups;
