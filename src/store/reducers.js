import { LOGIN, LOGOUT } from "./userDefinedActions.js";
const states = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          id: action.payload.id,
          email: action.payload.email,
          userName: action.payload.userName,
          type: action.payload.userType,
        },
      };
    case LOGOUT: {
      delete state["user"];
      return { ...state };
    }
    default:
      return state;
  }
};

export default states;
