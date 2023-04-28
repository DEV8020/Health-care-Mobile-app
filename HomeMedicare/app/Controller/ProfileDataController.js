import GlobalServiceHandler from "./GlobalServiceController";
import APIURLUtilities from "./APIUrlUtilities";

const GetUserProfileDetails = async (props) => {
  //   console.log(props.authToken);
  var UserName;

  try {
    const username = await APIURLUtilities.getLoggedInUserName();
    console.log(username); // "arshdeepworker"
    UserName = username;
  } catch (error) {
    console.log(error);
  }
  await GlobalServiceHandler.hitDataGetService({
    childURL:
      APIURLUtilities.getFieldWorkerAPIChildURLKeys()
        .fieldWorkerGetDetailsAPIKey + UserName,

    responseDataHandler: (profileServiceData) => {
      //Login respone parsing in case of Success...
      if (profileServiceData.responseError === null) {
        props.userProfileResponseHandler({
          isProfileDataFlag: true,
          profileData: profileServiceData.responseData.data,
          errorMessage: null,
        });
      }
      //Login respone parsing in case of Error...
      else if (profileServiceData.responseData === null) {
        props.userProfileResponseHandler({
          isProfileDataFlag: false,
          profileData: null,
          errorMessage: profileServiceData.responseError.message,
        });
      }
    },
  });
};
const ProfileDataController = { GetUserProfileDetails };
export default ProfileDataController;
