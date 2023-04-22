import storeObj from "../Store/storeDataService";
import GetNewFollowups from "./GetNewFollowups";

const StoreNewFollowupsInStorage = async () => {
  const getRequestFollowupResponse = await GetNewFollowups({
    followupListData: batchesOfFollowups,
    GetFollowupsResponseHandler: GetFollowupsResponseHandler,
  });
  const GetFollowupsResponseHandler = (response) => {
    if (response) {
      console.log(response.data);

      //Sync Logic Here

      //   storeObj.storeData("Followups", getRequestFollowupResponse);
    } else {
      console.log("response Error");
    }
  };
};

export default StoreNewFollowupsInStorage;
