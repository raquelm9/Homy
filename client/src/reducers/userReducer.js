import { SET_USER, LOG_OUT, SET_USER_NOTIFICATION, REMOVE_USER_NOTIFICATION } from "../actions/types";

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
        user: {
          ...state.user,
          ...action.payload
        }
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
        user: {
          ...state.user,
          notification_active: action.payload.length ? true : false,
          notification_req_id: [action.payload]
        }
      };
    case REMOVE_USER_NOTIFICATION:
      let notificationActive = true;
      let notificationReqId = [...state.user.notification_req_id];

      notificationReqId.shift();

      if (state.user.notification_req_id.length <= 1) {
        notificationActive = false
      }
      return {
        ...state,
        user: {
          ...state.user,
          notification_active: notificationActive,
          notification_req_id: notificationReqId
        }
      };
    default:
      return state;
  }
};

export default userReducer;
