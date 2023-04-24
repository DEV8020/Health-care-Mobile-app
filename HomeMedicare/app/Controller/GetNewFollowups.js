// import { sendItemsToServer } from "../Store/Redux/actions";
import GlobalServiceHandler from "./GlobalServiceController";
import APIURLUtilities from "./APIUrlUtilities";
import FetchLastStoredFollowupId from "../UtilityModules/FetchLastStoredFollowup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetNewFollowups = async (props) => {
  var lastFollowupId;
  await AsyncStorage.getItem("FollowupData").then((data) => {
    if (data !== null) {
      const dataArray = JSON.parse(data);
      dataArray.sort((a, b) => a.followUpId - b.followUpId);
      const lastItem = dataArray.pop();
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      // console.log(lastItem.followUpId);
      lastFollowupId = lastItem.followUpId;
    } else {
      lastFollowupId = -1;
    }
  });
  // console.log("Last Followup Id");
  // console.log(lastFollowupId);
  var UserName;

  try {
    const username = await APIURLUtilities.getLoggedInUserName();
    console.log(username); // "arshdeepworker"
    UserName = username;
  } catch (error) {
    console.log(error);
  }
  console.log("GetSuperAdminAllRegisteredUserList");

  // var folloupID = props.followupID;
  const lastStoredFollowupId = FetchLastStoredFollowupId();

  // console.log("GFSGDFHDG");
  // console.log(UserName);

  const childURL =
    APIURLUtilities.getFieldWorkerAPIChildURLKeys()
      .fieldWorkerGetFollowupsAPIKey +
    UserName +
    "/" +
    lastFollowupId;

  console.log(childURL);

  await GlobalServiceHandler.hitGetService({
    childURL: childURL,
    responseDataHandler: (followUpData) => {
      // console.log("getPatientDetailsServiceData");
      console.log(followUpData);
      if (followUpData.responseError === null) {
        props.GetFollowupsResponseHandler({
          isFollowUpListSuccessfully: true,
          followUpData: followUpData.responseData.data,
          errorMessage: null,
        });
      } else if (followUpData.responseData === null) {
        props.GetFollowupsResponseHandler({
          isFollowUpListSuccessfully: false,
          followUpData: null,
          errorMessage: followUpData.responseError.message,
        });
      }
    },
  });
};

export default GetNewFollowups;
