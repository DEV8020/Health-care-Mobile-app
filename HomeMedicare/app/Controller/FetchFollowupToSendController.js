import sendUpdatedFollowupsToServer from "./SendUpdatedFollowupToServerController";
import FetchCompletedFollowups from "../UtilityModules/FetchCompletedFollowups";
import { useState } from "react";

//set Batch size of followups here ...
var batchSize = 5;

const SendCompletedFollowups = async () => {
  //Fetch completed followups from Local Storage
  const completedFollowupsList = await FetchCompletedFollowups();
  console.log(completedFollowupsList.length);

  //Server Response Handler
  const SendFollowupsResponseHandler = (response) => {
    if (response) {
      console.log(response.data);
    } else {
      console.log("response Error");
    }
  };

  //variable to get server response
  var sendFollowupResponse = { data: true };
  for (let i = 0; i < completedFollowupsList.length; i += batchSize) {
    if (sendFollowupResponse) {
      const batchesOfFollowups = [];
      const batch = completedFollowupsList.slice(i, i + batchSize);
      batchesOfFollowups.push(batch);
      console.log(batchesOfFollowups);
      //SEND FOLLOWUPS TO SERVER CODE HERE
      sendFollowupResponse = await sendUpdatedFollowupsToServer({
        followupListData: batchesOfFollowups,
        SendFollowupsResponseHandler: SendFollowupsResponseHandler,
      });
      // sendFollowupResponse = { data: true };
    } else {
      console.log("Response Error block sending again ");
      i = i - 1;
    }
  }
};

export default SendCompletedFollowups;
