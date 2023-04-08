import axios from "axios";

//const serverURL = `http://192.168.9.225:9191/`;
const serverURL = `http://172.16.140.248:9191/`;

const hitCustomResponsePostService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler");
    console.log(url);

    const response = await axios.post(url, props.postData, {
      validateStatus: function (status) {
        return status >= 200 && status < 500; // Resolve only if the status code is less than 500
      },
    });

    console.log("Data recieved");
    console.log(response.status);

    if (response.status === 200) {
      // console.log(response);
      props.responseDataHandler({
        responseData: response,
      });
    } else if (response.status === 404) {
      console.log("404 response");

      props.responseDataHandler({
        responseData: response,
      });
    } else {
      console.log("else block");
      // console.log(response);
      props.responseDataHandler({
        responseData: response,
      });
    }
  } catch (error) {
    console.log("error block");
    console.log(error);
    props.responseDataHandler({
      responseData: null,
    });
  }
};

const GlobalServiceHandler = { hitCustomResponsePostService };
export default GlobalServiceHandler;
