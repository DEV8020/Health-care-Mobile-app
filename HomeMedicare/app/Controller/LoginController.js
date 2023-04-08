import GlobalServiceHandler from "./GlobalServiceHandler";

const GetUserLoginData = async (props) => {
    console.log(props.userData);
  await GlobalServiceHandler.hitCustomResponsePostService({
    childURL: "login",
    postData: props.userData,
    responseDataHandler: (loginServiceData) => {
      console.log(loginServiceData);
      if (loginServiceData.responseData === null) {
        console.log("Entered in error block");
        }
        else{
            props.set
        }
    },
  });
};

const LoginController = { GetUserLoginData };
export default LoginController;
