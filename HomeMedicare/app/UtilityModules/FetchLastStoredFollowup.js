// import AsyncStorage from "@react-native-async-storage/async-storage";
import storeObj from "../Store/storeDataService";
const FetchLastStoredFollowupId = async (props) => {
  const lastStoredFollowup = await storeObj
    .getData("Followups")
    .then((data) => {
      if (data !== null) {
        // const lastStoredfollowup = data.filter(
        //   (followup) => ()
        // );
        return -1;
        console.log(completedFollowups.length);
        // async function getLastItemFromAsyncStorage() {
        //   try {
        //     const data = await AsyncStorage.getItem('your_storage_key');
        //     if (data !== null) {
        //       const dataArray = JSON.parse(data);
        //       dataArray.sort((a, b) => a.id - b.id);
        //       const lastItem = dataArray.pop();
        //       return lastItem;
        //     }
        //   } catch (error) {
        //     console.error(error);
        //   }
        // }

        return completedFollowups;
      } else {
        console.log("empty");
        return -1;
      }
    });
  return lastStoredFollowup;
};

export default FetchLastStoredFollowupId;
