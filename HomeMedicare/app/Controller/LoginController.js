import { ToastAndroid } from "react-native";
import GlobalServiceHandler from "./GlobalServiceController";

const GetUserLoginData = async (props) => {
  console.log(props.userData);
  await GlobalServiceHandler.hitPostService({
    childURL: "login/",
    postData: props.userData,
    responseDataHandler: (loginServiceData) => {
      //Login respone parsing in case of Success...
      if (loginServiceData.responseError === null) {
        props.userLoginResponseHandler({
          isLoginFlag: true,
          loggedInUserData: loginServiceData.responseData.data,
          errorMessage: null,
        });
      }
      //Login respone parsing in case of Error...
      else if (loginServiceData.responseData === null) {
        props.userLoginResponseHandler({
          isLoginFlag: false,
          loggedInUserData: null,
          errorMessage: loginServiceData.responseError.message,
        });
      }
    },
  });
};

const LoginController = { GetUserLoginData };
export default LoginController;
