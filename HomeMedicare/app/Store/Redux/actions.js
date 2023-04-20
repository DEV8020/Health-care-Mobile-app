// actions.js

import AsyncStorage from "@react-native-async-storage/async-storage";

export const ADD_FOLLOWUP = "ADD_FOLLOWUP";
export const UPDATE_FOLLOWUP = "UPDATE_FOLLOWUP";
export const GET_FOLLOWUPS_FROM_ASYNC_STORAGE =
  "GET_FOLLOWUPS_FROM_ASYNC_STORAGE";
export const SET_FOLLOWUPS_FROM_SERVER = "SET_FOLLOWUPS_FROM_SERVER";
export const ADD_FOLLOWUPS_TO_SERVER = "ADD_FOLLOWUPS_TO_SERVER";

export const addFollowup = (followup) => async (dispatch) => {
  try {
    const followupWithId = { ...followup, id: Date.now().toString() };
    dispatch({ type: ADD_FOLLOWUP, payload: followupWithId });
    await AsyncStorage.mergeItem("Followups", JSON.stringify([followupWithId]));
  } catch (error) {
    console.error(error);
  }
};

export const updateFollowup = (followup) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FOLLOWUP, payload: followup });
    await AsyncStorage.mergeItem("Followups", JSON.stringify([followup]));
  } catch (error) {
    console.error(error);
  }
};

export const getFollowupsFromAsyncStorage = () => async (dispatch) => {
  try {
    const followups = await AsyncStorage.getItem("Followups");
    if (followups) {
      dispatch({
        type: GET_FOLLOWUPS_FROM_ASYNC_STORAGE,
        payload: JSON.parse(followups),
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const setFollowupsFromServer = (followups) => ({
  type: SET_FOLLOWUPS_FROM_SERVER,
  payload: followups,
});

export const addFollowupsToServer = (followups) => ({
  type: ADD_FOLLOWUPS_TO_SERVER,
  payload: followups,
});
