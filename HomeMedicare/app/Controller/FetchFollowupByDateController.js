import AsyncStorage from "@react-native-async-storage/async-storage";
import storeObj from "../Store/storeDataService";
import moment from "moment";
import APIURLUtilities from "./APIUrlUtilities";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const FetchFollowup = (followupList, setFollowupList, followupType) => {
  const today = moment(new Date()).format("YYYY-MM-DD");
  const isUpdated = AsyncStorage.getItem(APIURLUtilities.getStorageKey()).then(
    (list) => {
      if (list !== null) {
        const data = JSON.parse(list);
        console.log(data);
        switch (followupType) {
          case "Today":
            console.log("Today");
            // Code to execute if followupType is "Today"
            const todayFollowup = data.filter((item) => item.date === today);
            console.log(todayFollowup);
            setFollowupList(todayFollowup);
            return todayFollowup;
            break;
          case "Past":
            // Code to execute if followupType is "Past"
            const pastFollowup = data.filter((item) => item.date < today);
            console.log(pastFollowup);
            setFollowupList(pastFollowup);
            return pastFollowup;
            break;
          case "Upcoming":
            // Code to execute if followupType is "Upcoming"
            const upcomingFollowup = data.filter((item) => item.date > today);
            console.log(upcomingFollowup);
            setFollowupList(upcomingFollowup);
            return upcomingFollowup;
            break;
          default:
          // Code to execute if followupType doesn't match any case
        }
      } else {
        console.log("empty");
      }
    }
  );
  console.log(isUpdated);
};
export default FetchFollowup;
