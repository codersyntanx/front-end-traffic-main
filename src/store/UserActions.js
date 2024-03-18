import { LOGIN, LOGOUT } from "./userDefinedActions";

export const LoginUser =
  (id, email, userName, typeOfUser) => async (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: { id, email, userName, userType: typeOfUser },
    });
  };
export const LogoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
