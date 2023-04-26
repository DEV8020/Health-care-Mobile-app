import axios from "axios";
import APIURLUtilities from "./APIUrlUtilities";

//const serverURL = `http://192.168.9.225:9191/`;
// http://localhost:9494/login/helloWorld
const serverURL = `http://192.168.233.225:9191/`;

// const getHeaderConfigurationsList = async () => {
//   var Token;

//   try {
//     const token = await APIURLUtilities.getAuthToken();
//     console.log("getHeaderConfigurationsList for auth token");
//     console.log(token); // "arshdeepworker"
//     Token = token;
//   } catch (error) {
//     console.log(error);
//   }

//   return {
//     headers: {
//       Authorization: "Bearer " + Token,
//     },
//     validateStatus: function (status) {
//       return (
//         status === 200 || status === 404 || status === 403 || status === 500
//       );
//       // Resolve only if the status code is 202 or 404...
//     },
//   };
// };

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

    console.log(url);

    console.log("URL Hitting in GlobalServiceHandler in Get Service Call");
    // console.log(url);
    // console.log(UtilitiesMethods.getAuthTokenForLoggedInUser());

    // console.log(GlobalServiceHandler.getHeaderConfigurationsList());
    var Token;

    try {
      const token = await APIURLUtilities.getAuthToken();
      console.log("getHeaderConfigurationsList for auth token");
      console.log(token); // "arshdeepworker"
      Token = token;
    } catch (error) {
      console.log(error);
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + Token,
      },
      validateStatus: function (status) {
        return (
          status === 200 || status === 404 || status === 403 || status === 500
        );
        // Resolve only if the status code is 202 or 404...
      },
    });

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
const hitDataPutService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log(url);

    console.log("URL Hitting in GlobalServiceHandler in Get Service Call");
    // console.log(url);
    // console.log(UtilitiesMethods.getAuthTokenForLoggedInUser());

    // console.log(GlobalServiceHandler.getHeaderConfigurationsList());
    var Token;

    try {
      const token = await APIURLUtilities.getAuthToken();
      console.log("getHeaderConfigurationsList for auth token");
      console.log(token); // "arshdeepworker"
      Token = token;
    } catch (error) {
      console.log(error);
    }

    // const f = [
    //   {
    //     followUpId: 6,
    //     isSync: true,
    //     date: "2023-04-26",
    //     fieldWorkerRemarks: "upadted now",
    //     doctorRemarks: "check temp 4",
    //     flag: true,
    //     lastSyncDate: null,
    //     otp: 1111,
    //     hospital: {
    //       hospId: 2,
    //       name: "Dharavi Charitable",
    //       address: "Dharavi",
    //       pincode: 400001,
    //       supervisor: {
    //         authId: 3,
    //         username: "darshansupervisor",
    //         password:
    //           "$2a$10$zacGeQLQLp9r/GWpshbNf.ruD2Vi1rvuqvpoZ1f7HkksoGGIxboyG",
    //         role: "ROLE_SUPERVISOR",
    //         name: "Darshan ",
    //         contact: "9858965874",
    //         address: "Dharavi",
    //         pincode: 400001,
    //       },
    //       supId: {
    //         authId: 3,
    //         username: "darshansupervisor",
    //         password:
    //           "$2a$10$zacGeQLQLp9r/GWpshbNf.ruD2Vi1rvuqvpoZ1f7HkksoGGIxboyG",
    //         role: "ROLE_SUPERVISOR",
    //         name: "Darshan ",
    //         contact: "9858965874",
    //         address: "Dharavi",
    //         pincode: 400001,
    //       },
    //     },
    //     patient: {
    //       patientId: 9,
    //       name: "Cameroon Green",
    //       address: "Australia",
    //       pincode: 141006,
    //       age: 17,
    //       sex: "Male",
    //       contact: "9988745886",
    //       fieldWorker: {
    //         authId: 7,
    //         username: "a",
    //         password:
    //           "$2a$10$ikLCXQnSugrkh56HE4GoLOoGr3A7tcWgVOUobvAwSzUPExHodj/9a",
    //         role: "ROLE_FIELD_WORKER",
    //         name: "Arshdeep Singh",
    //         address: "Punjab",
    //         pincode: 141006,
    //         contact: "8877874559",
    //         availableStatus: true,
    //         supervisor: {
    //           authId: 3,
    //           username: "darshansupervisor",
    //           password:
    //             "$2a$10$zacGeQLQLp9r/GWpshbNf.ruD2Vi1rvuqvpoZ1f7HkksoGGIxboyG",
    //           role: "ROLE_SUPERVISOR",
    //           name: "Darshan ",
    //           contact: "9858965874",
    //           address: "Dharavi",
    //           pincode: 400001,
    //         },
    //       },
    //       dob: "2006-02-08",
    //     },
    //     readings: {
    //       bloodPressure: "Sahi hai",
    //       temperature: "garam hai",
    //       sugar: "jyada hai",
    //     },
    //   },
    // ];

    const f = props.postData;
    console.log(f);

    const response = await axios.put(url, f, {
      headers: {
        Authorization: "Bearer " + Token,
      },
      validateStatus: function (status) {
        return (
          status === 200 || status === 404 || status === 403 || status === 500
        );
        // Resolve only if the status code is 202 or 404...
      },
    });

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
  hitDataPutService,
  handleAPICallReponseData,
};
export default GlobalServiceHandler;
