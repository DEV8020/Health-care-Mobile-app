// import { sendItemsToServer } from "../Store/Redux/actions";
import GlobalServiceHandler from "./GlobalServiceController";

const sendUpdatedFollowupsToServer = async (props) => {
  console.log(props.followupListData);
  await GlobalServiceHandler.hitPostService({
    childURL: "helloWorld",
    postData: props.followupListData,
    responseDataHandler: (sendFollowupData) => {
      if (sendFollowupData.responseData === null) {
        console.log("Entered in error block");
        // ToastAndroid.show("Network Error");
        return null;
      } else {
        return sendFollowupData.responseData.data;
      }
    },
  });
};

export default sendUpdatedFollowupsToServer;
