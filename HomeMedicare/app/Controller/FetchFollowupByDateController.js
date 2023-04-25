import AsyncStorage from "@react-native-async-storage/async-storage";
import storeObj from "../Store/storeDataService";
import moment from "moment";
import APIURLUtilities from "./APIUrlUtilities";

const FetchFollowup = (followupList, setFollowupList, followupType) => {
  const today = moment(new Date()).format("DD-MM-YYYY");
  storeObj.getData(APIURLUtilities.getStorageKey()).then((data) => {
    if (data !== null) {
      // console.log(data.length);

      switch (followupType) {
        case "Today":
          // Code to execute if followupType is "Today"
          setFollowupList(
            data.filter(
              (item) => moment(item.date).format("DD-MM-YYYY") === today
            )
          );

          break;
        case "Past":
          // Code to execute if followupType is "Past"
          setFollowupList(
            data.filter(
              (item) => moment(item.date).format("DD-MM-YYYY") < today
            )
          );

          break;
        case "Upcoming":
          // Code to execute if followupType is "Upcoming"
          setFollowupList(
            data.filter(
              (item) => moment(item.date).format("DD-MM-YYYY") > today
            )
          );

          break;
        default:
        // Code to execute if followupType doesn't match any case
      }
      return true;
    } else {
      console.log("empty");
      return false;
    }
  });
};
export default FetchFollowup;
