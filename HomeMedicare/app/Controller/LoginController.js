import { ToastAndroid } from "react-native";
import GlobalServiceHandler from "./GlobalServiceController";

const GetUserLoginData = async (props) => {
  console.log(props.userData);
  await GlobalServiceHandler.hitCustomResponsePostService({
    childURL: "login",
    postData: props.userData,
    responseDataHandler: (loginServiceData) => {
      if (loginServiceData.responseData === null) {
        console.log("Entered in error block");
        ToastAndroid.show("Network Error");
      } else {
        props.LoginResponseHandler(loginServiceData.responseData.data);
      }
    },
  });
};

const LoginController = { GetUserLoginData };
export default LoginController;
