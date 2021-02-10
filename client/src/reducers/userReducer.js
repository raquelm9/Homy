import { SET_USER, LOG_OUT, SET_USER_NOTIFICATION } from "../actions/types";

const defaultState = {
  loggedIn: false,
  user: {}
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loggedIn: true,
        user: { ...action.payload }
      };
    case LOG_OUT:
      localStorage.clear();
      return {
        loggedIn: false,
        user: {}

      };
    case SET_USER_NOTIFICATION:
      return {
        ...state,
        user: { ...state.user, notification_active: false, notification_req_id: '' }
      }
    default:
      return state;
  }
};

export default userReducer;
// user: {
//   notification_active: action.payload,
//     notification_req_id: ""
// }