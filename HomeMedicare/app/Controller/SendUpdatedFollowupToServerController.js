// import { sendItemsToServer } from "../Store/Redux/actions";
import APIURLUtilities from "./APIUrlUtilities";
import GlobalServiceHandler from "./GlobalServiceController";

const sendUpdatedFollowupsToServer = async (props) => {
  console.log(props.followupListData);

  // var UserName;

  // try {
  //   const username = await APIURLUtilities.getLoggedInUserName();
  //   console.log(username); // "arshdeepworker"
  //   UserName = username;
  // } catch (error) {
  //   console.log(error);
  // }

  const childURL =
    APIURLUtilities.getFieldWorkerAPIChildURLKeys()
      .fieldWorkerPostFollowupAPIKey;

  console.log("%$^$^$&^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  console.log(childURL);
  console.log(props.followupListData);

  // return;

  await GlobalServiceHandler.hitDataPutService({
    childURL: childURL,
    postData: props.followupListData,
    responseDataHandler: (SendFollowupServiceData) => {
      //Login respone parsing in case of Success...
      if (SendFollowupServiceData.responseError === null) {
        props.SendFollowupsResponseHandler({
          isSendFollowupDataFlag: true,
          SendFollowupData: SendFollowupServiceData.responseData.data,
          errorMessage: null,
        });
      }
      //Login respone parsing in case of Error...
      else if (SendFollowupServiceData.responseData === null) {
        props.SendFollowupsResponseHandler({
          isSendFollowupFlag: false,
          SendFollowupData: null,
          errorMessage: SendFollowupServiceData.responseError.message,
        });
      }
    },
  });
};

export default sendUpdatedFollowupsToServer;
