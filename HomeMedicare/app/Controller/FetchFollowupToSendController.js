import sendDataToServer from "./SendFollowupController";
import FetchCompletedFollowups from "../UtilityModules/FetchCompletedFollowups";
import { useState } from "react";

const batchSize = 5;

const FetchFollowupToSend = async () => {
  // const [sendFollowupResponse, setSendFollowupResponse] = useState(null);

  const completedFollowupsList = await FetchCompletedFollowups();

  const SendFollowupsResponseHandler = (response) => {
    if (response) {
      // setSendFollowupResponse(true);
      console.log(response.data);
    } else {
      console.log("response Error");

      // setSendFollowupResponse(false);
    }
  };
  console.log(completedFollowupsList.length);
  var sendFollowupResponse = { data: true };
  for (let i = 0; i < completedFollowupsList.length; i += batchSize) {
    if (sendFollowupResponse) {
      const batchesOfFollowups = [];
      const batch = completedFollowupsList.slice(i, i + batchSize);
      batchesOfFollowups.push(batch);
      console.log(batchesOfFollowups);
      //SEND FOLLOWUPS TO SERVER CODE HERE
      sendFollowupResponse = await sendDataToServer({
        followupListData: batchesOfFollowups,
        SendFollowupsResponseHandler: SendFollowupsResponseHandler,
      });
      sendFollowupResponse = { data: true };
    } else {
      console.log("Response Error block sending again ");
      i = i - 1;
    }
  }
};

export default FetchFollowupToSend;
