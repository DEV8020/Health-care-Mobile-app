// import AsyncStorage from "@react-native-async-storage/async-storage";
import storeObj from "../Store/storeDataService";
const FetchCompletedFollowups = async (props) => {
  const completedFollowupsList = await storeObj
    .getData("Followups")
    .then((data) => {
      if (data !== null) {
        const completedFollowups = data.filter(
          (followup) => followup.status === "completed"
        );

        console.log(completedFollowups.length);

        //Delete Completed Followups from Storage

        // const NotCompletedFollowups = data.filter((followup) => followup.status !== "completed")
        // storeObj.storeData("Followups", NotCompletedFollowups);

        return completedFollowups;
      } else {
        console.log("empty");
        return [];
      }
    });
  return completedFollowupsList;
};

export default FetchCompletedFollowups;
