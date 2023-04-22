// import { sendItemsToServer } from "../Store/Redux/actions";
import GlobalServiceHandler from "./GlobalServiceController";

const GetNewFollowups = async (props) => {
  await GlobalServiceHandler.hitPostService({
    childURL: "helloWorld",
    getData: props.followupListData,
    responseDataHandler: (getFollowupData) => {
      if (getFollowupData.responseData === null) {
        console.log("Entered in error block");
        return null;
      } else {
        return getFollowupData.responseData.data;
      }
    },
  });
};

export default GetNewFollowups;
