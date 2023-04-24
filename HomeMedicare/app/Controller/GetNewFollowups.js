// import { sendItemsToServer } from "../Store/Redux/actions";
import GlobalServiceHandler from "./GlobalServiceController";
import APIURLUtilities from "./APIUrlUtilities";
import FetchLastStoredFollowupId from "../UtilityModules/FetchLastStoredFollowup";

const GetNewFollowups = async (props) => {
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

  console.log("GFSGDFHDG");
  console.log(UserName);

  const childURL =
    APIURLUtilities.getFieldWorkerAPIChildURLKeys()
      .fieldWorkerGetFollowupsAPIKey +
    UserName +
    "/" +
    "-1";

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
