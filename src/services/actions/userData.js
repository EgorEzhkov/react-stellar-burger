import { apiGetUser, apiUserLogIn, apiUserReg } from "../../utils/api";

export const REG_USER_SUCCESS = "GET_USER_SUCCESS";
export const REG_USER_FAILED = "GET_USER_FAILED";
export const REG_USER_REQUEST = "GET_USER_REQUEST";

export const LOG_IN_USER_REQUEST = "LOG_IN_USER_REQUEST";
export const LOG_IN_USER_FAILED = "LOG_IN_USER_FAILED";
export const LOG_IN_USER_SUCCESS = "LOG_IN_USER_SUCCESS";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";

export const getUserData = () => {
  return function (dispatch) {
    dispatch({ type: GET_USER_DATA_REQUEST });
    apiGetUser()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_DATA_SUCCESS,
            userData: res,
          });
        } else {
          dispatch({
            type: GET_USER_DATA_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({ type: GET_USER_DATA_FAILED });
      });
  };
};

export const RegUserData = (email, password, name) => {
  return function (dispatch) {
    dispatch({ type: REG_USER_REQUEST });
    apiUserReg(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REG_USER_SUCCESS,
            userDataReg: res,
          });
        } else {
          dispatch({
            type: REG_USER_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: REG_USER_FAILED,
        });
      });
  };
};

export const LogInUserData = (email, password) => {
  return function (dispatch) {
    dispatch({ type: LOG_IN_USER_REQUEST });
    apiUserLogIn(email, password)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: LOG_IN_USER_SUCCESS,
            userDataLogIn: res,
          });
          dispatch({
            type: SET_AUTH_CHECKED,
            payload: true,
          });
        } else {
          dispatch({ type: LOG_IN_USER_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: LOG_IN_USER_FAILED });
      });
  };
};
