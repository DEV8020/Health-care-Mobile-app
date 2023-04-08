// Define action types
const ADD_FOLLOWUP = "ADD_FOLLOWUP";
const UPDATE_FOLLOWUP = "UPDATE_FOLLOWUP";
const DELETE_FOLLOWUP = "DELETE_FOLLOWUP";

// Define initial state
const initialState = {
  Followups: [],
};

// Define reducers
const followupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOLLOWUP:
      return {
        ...state,
        Followups: [...state.Followups, action.payload],
      };
    case UPDATE_FOLLOWUP:
      return {
        ...state,
        Followups: state.Followups.map((Followup) =>
          Followup.id === action.payload.id ? action.payload : Followup
        ),
      };
    case DELETE_FOLLOWUP:
      return {
        ...state,
        Followups: state.Followups.filter(
          (Followup) => Followup.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(followupReducer);

// Define action creators
const addFollowup = (Followup) => ({
  type: ADD_FOLLOWUP,
  payload: Followup,
});

const updateFollowup = (Followup) => ({
  type: UPDATE_FOLLOWUP,
  payload: Followup,
});

const deleteFollowup = (followupId) => ({
  type: DELETE_FOLLOWUP,
  payload: followupId,
});

// Dispatch actions to store
// store.dispatch(
//   addFollowup({
//     id: "14",
//     title: "Patient 14",
//     name: "ABC",
//     address: "ABC",
//     status: "pending",
//     date: "03-04-2023",
//   })
// );

// store.dispatch(
//   updateFollowup({
//     id: "1",
//     title: "Patient 1",
//     name: "XYZ",
//     address: "XYZ",
//     status: "completed",
//     date: "03-04-2023",
//   })
// );

// store.dispatch(deleteFollowup("2"));
