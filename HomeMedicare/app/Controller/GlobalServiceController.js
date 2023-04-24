import axios from "axios";

//const serverURL = `http://192.168.9.225:9191/`;
// http://localhost:9494/login/helloWorld
const serverURL = `http://192.168.233.225:9191/`;

const getHeaderConfigurationsList = () => {
  return {
    headers: {
      Authorization: "Bearer " + UtilitiesMethods.getAuthTokenForLoggedInUser(),
    },
    validateStatus: function (status) {
      return (
        status === 200 || status === 404 || status === 403 || status === 500
      );
      // Resolve only if the status code is 202 or 404...
    },
  };
};

//Method to handle the response of the API Calls...
const handleAPICallReponseData = (prop) => {
  if (prop.response.status === 200) {
    prop.responseHandler({
      responseData: prop.response,
      responseError: null,
    });
  } else {
    prop.responseHandler({
      responseData: null,
      responseError: Error(prop.response.data.message),
    });
  }
};

const hitPostService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler");
    console.log(url);
    console.log(props.postData);

    const response = await axios.post(url, props.postData, {
      validateStatus: function (status) {
        return (
          status === 200 || status === 404 || status === 403 || status === 500
        );
        // Resolve only if the status code is 202 or 404...
      },
    });

    console.log("Data recieved");
    console.log(response.status);

    if (response.status === 200) {
      props.responseDataHandler({
        responseData: response,
        responseError: null,
      });
    } else if (response.status === 403) {
      console.log("403 response");
      console.log(response);
      props.responseDataHandler({
        responseData: null,
        responseError: Error(response.data.message),
      });
    } else if (response.status === 404) {
      console.log("404 response");
      console.log(response);
      props.responseDataHandler({
        responseData: null,
        responseError: Error(response.data.message),
      });
    } else if (response.status === 500) {
      console.log("404 response");
      console.log(response);
      props.responseDataHandler({
        responseData: null,
        responseError: Error(response.data.message),
      });
    } else {
      console.log("else block");
      console.log(response);
      props.responseDataHandler({
        responseData: response,
        responseError: null,
      });
    }
  } catch (error) {
    console.log("error block");
    console.log(error);
    props.responseDataHandler({
      responseData: null,
      responseError: error,
    });
  }
};

const hitGetService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler in Get Service Call");
    console.log(url);
    console.log(UtilitiesMethods.getAuthTokenForLoggedInUser());

    const response = await axios.get(
      url,
      GlobalServiceHandler.getHeaderConfigurationsList()
    );

    console.log("Data recieved");
    console.log(response);

    //Call the Global Method for Handling the API response...
    handleAPICallReponseData({
      response: response,
      responseHandler: props.responseDataHandler,
    });
  } catch (error) {
    props.responseDataHandler({
      responseData: null,
      responseError: error,
    });
  }
};

const GlobalServiceHandler = {
  hitPostService,
  hitGetService,
  getHeaderConfigurationsList,
  handleAPICallReponseData,
};
export default GlobalServiceHandler;
