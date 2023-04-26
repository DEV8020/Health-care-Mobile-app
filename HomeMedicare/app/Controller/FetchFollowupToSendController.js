import sendUpdatedFollowupsToServer from "./SendUpdatedFollowupToServerController";
import FetchCompletedFollowups from "../UtilityModules/FetchCompletedFollowups";
import APIURLUtilities from "./APIUrlUtilities";

import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//set Batch size of followups here ...
var batchSize = 5;
// const sendSucessTimerDuration = 2000;
// const sendIdleTimerDuration = 120000;

const SendCompletedFollowups = async (props) => {
  //Fetch completed followups from Local Storage
  const completedFollowupsList = await FetchCompletedFollowups();
  console.log("SendCompletedFollowups");
  console.log(completedFollowupsList.length);

  //Server Response Handler
  const SendFollowupsResponseHandler = (prop) => {
    // const updatedFollowUpIds = [3, 4, 5, 102, 103];

    console.log("WDSGFGDFSGDFGDFG*****************************************");
    console.log(prop);

    // isSendFollowupDataFlag: true,
    // SendFollowupData: SendFollowupServiceData.responseData.data,
    // errorMessage: null,

    // {isSendFollowupDataFlag: true, SendFollowupData: Array(1), errorMessage: null}

    // return;

    if (prop.isSendFollowupDataFlag === false) {
      //Send the value through the props to set the timer for 5 minutes...
      console.log("10 MIn");
      props.setTimerHandler(false);
      return;
    }

    if (prop.SendFollowupData.length === 0) {
      //Send the value through the props to set the timer for 5 minutes...
      console.log("10 MIn hello");
      props.setTimerHandler(false);
      return;
    }

    const updatedFollowUpIds = prop.SendFollowupData;

    AsyncStorage.getItem(APIURLUtilities.getStorageKey()).then((list) => {
      const data = JSON.parse(list);
      if (data !== null) {
        // console.log(data);
        const UpdateFollowupList = data;
        updatedFollowUpIds.map((followupId) => {
          console.log(followupId);

          const updateFollowUpIndex = UpdateFollowupList.findIndex(
            (item) => item.followUpId === followupId
          );
          const Followup = UpdateFollowupList[updateFollowUpIndex];
          console.log(Followup);
          console.log("Followup to Be Updated");
          Followup.isFollowUpSynced = true;
          console.log("Followup is updated");
          console.log(Followup);
          UpdateFollowupList[updateFollowUpIndex] = Followup;
        });

        AsyncStorage.setItem(
          APIURLUtilities.getStorageKey(),
          JSON.stringify(UpdateFollowupList)
        );

        //Send the value through the props to set the timer for success minutes...
        // props.setFollowUpSendResponse(true);
        props.setTimerHandler(true);

        console.log("Success");
      } else {
        //Send the value through the props to set the timer for 5 minutes...
        console.log("10 MIn");
        props.setTimerHandler(false);
        console.log("empty");
      }
    });

    // AsyncStorage.getItem(APIURLUtilities.getStorageKey()).then((data) =>
    //   console.log(data)
    // );

    // if (response) {
    //   console.log(response.data);
    // } else {
    //   console.log("response Error");
    // }
  };

  //variable to get server response

  const getLastNotSynchedFollowUpList = () => {
    const batchesOfFollowups = [];
    const batch = completedFollowupsList.slice(0, batchSize);
    // batchesOfFollowups.push(batch);
    // console.log(batch);
    // console.log("*********** Batch of Followup********************");
    // batch.map((f) => console.log(f));
    return batch;
  };

  // const listOfUnSynchedFollowUps = getLastNotSynchedFollowUpList();

  //SEND FOLLOWUPS TO SERVER CODE HERE
  // if (getLastNotSynchedFollowUpList().length > 0) {
  sendFollowupResponse = await sendUpdatedFollowupsToServer({
    followupListData: getLastNotSynchedFollowUpList(),
    SendFollowupsResponseHandler: SendFollowupsResponseHandler,
  });
  // }

  // for (let i = 0; i < completedFollowupsList.length; i += batchSize) {
  //   // if (sendFollowupResponse) {
  //     const batchesOfFollowups = [];
  //     const batch = completedFollowupsList.slice(i, i + batchSize);
  //     batchesOfFollowups.push(batch);
  //     console.log(batchesOfFollowups);
  //     console.log("*********** Batch of Followup********************");

  //     //SEND FOLLOWUPS TO SERVER CODE HERE
  //     sendFollowupResponse = await sendUpdatedFollowupsToServer({
  //       followupListData: batchesOfFollowups,
  //       SendFollowupsResponseHandler: SendFollowupsResponseHandler,
  //     });
  //     // SendFollowupsResponseHandler();
  //     // sendFollowupResponse = { data: true };
  //   // } else {
  //     // console.log("Response Error block sending again ");
  //     // i = i - 1;
  //   // }
  // }
};

export default SendCompletedFollowups;
