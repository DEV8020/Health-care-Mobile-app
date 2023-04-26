// import AsyncStorage from "@react-native-async-storage/async-storage";
import storeObj from "../Store/storeDataService";
import APIURLUtilities from "../Controller/APIUrlUtilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
const FetchCompletedFollowups = async (props) => {
  var completedFollowups;
  await AsyncStorage.getItem(APIURLUtilities.getStorageKey()).then((list) => {
    const data = JSON.parse(list);
    if (data !== null) {
      console.log(data.length);
      console.log(data);
      completedFollowups = data.filter(
        (followup) =>
          followup.flag === true && followup.isFollowUpSynced === false
      );
      console.log("Fetch Completed Followup");
      console.log(completedFollowups.length);

      //Delete Completed Followups from Storage

      // const NotCompletedFollowups = data.filter((followup) => followup.status !== "completed")
      // storeObj.storeData("Followups", NotCompletedFollowups);
    } else {
      console.log("empty");
      completedFollowups = [];
    }
  });
  return completedFollowups;
};

export default FetchCompletedFollowups;
