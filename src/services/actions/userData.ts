import { apiGetUser, apiPostUser, apiUserLogIn, apiUserLogOut, apiUserReg } from "../../utils/api";

export const REG_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const REG_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const REG_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";

export const LOG_IN_USER_REQUEST: "LOG_IN_USER_REQUEST" = "LOG_IN_USER_REQUEST";
export const LOG_IN_USER_FAILED: "LOG_IN_USER_FAILED" = "LOG_IN_USER_FAILED";
export const LOG_IN_USER_SUCCESS: "LOG_IN_USER_SUCCESS" = "LOG_IN_USER_SUCCESS";

export const LOG_OUT_USER_REQUEST: "LOG_OUT_USER_REQUEST" = "LOG_OUT_USER_REQUEST";
export const LOG_OUT_USER_FAILED: "LOG_OUT_USER_FAILED" = "LOG_OUT_USER_FAILED";
export const LOG_OUT_USER_SUCCESS: "LOG_OUT_USER_SUCCESS" = "LOG_OUT_USER_SUCCESS";

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";

export const GET_USER_DATA_REQUEST: "GET_USER_DATA_REQUEST" = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_FAILED: "GET_USER_DATA_FAILED" = "GET_USER_DATA_FAILED";
export const GET_USER_DATA_SUCCESS: "GET_USER_DATA_SUCCESS" = "GET_USER_DATA_SUCCESS";

export const POST_USER_DATA_REQUEST: "POST_USER_DATA_REQUEST" = "POST_USER_DATA_REQUEST";
export const POST_USER_DATA_FAILED: "POST_USER_DATA_FAILED" = "POST_USER_DATA_FAILED";
export const POST_USER_DATA_SUCCESS: "POST_USER_DATA_SUCCESS" = "POST_USER_DATA_SUCCESS";

type TUser = {
  readonly email: string;
  readonly name: string;
};

export type TGetUserData = {
  readonly success: boolean;
  readonly user: TUser;
};

type TPostUserData = TGetUserData;

type TLogInUser = TGetUserData & { readonly accessToken: string; readonly refreshToken: string };

type TRegUser = TLogInUser;

interface IRegUserSuccess {
  readonly type: typeof REG_USER_SUCCESS;
  readonly userDataReg: TRegUser;
}

interface IRegUserRequest {
  readonly type: typeof REG_USER_REQUEST;
}

interface IRegUserFailed {
  readonly type: typeof REG_USER_FAILED;
}

interface ILogInUserRequest {
  readonly type: typeof LOG_IN_USER_REQUEST;
}

interface ILogInUserSuccess {
  readonly type: typeof LOG_IN_USER_SUCCESS;
  readonly userDataLogIn: TLogInUser;
}

interface ILogInUserFailed {
  readonly type: typeof LOG_IN_USER_FAILED;
}

interface ILogOutUserRequest {
  readonly type: typeof LOG_OUT_USER_REQUEST;
}

interface ILogOutUserSuccess {
  readonly type: typeof LOG_OUT_USER_SUCCESS;
}

interface ILogOutUserFailed {
  readonly type: typeof LOG_OUT_USER_FAILED;
}

interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}

interface IGetUserDataRequest {
  readonly type: typeof GET_USER_DATA_REQUEST;
}

interface IGetUserDataSuccess {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly userData: TGetUserData;
}

interface IGetUserDataFailed {
  readonly type: typeof GET_USER_DATA_FAILED;
}

interface IPostUserDataRequest {
  readonly type: typeof POST_USER_DATA_REQUEST;
}

interface IPostUserDataSuccess {
  readonly type: typeof POST_USER_DATA_SUCCESS;
  readonly userData: TPostUserData;
}

interface IPostUserDataFailed {
  readonly type: typeof POST_USER_DATA_FAILED;
}

export type TUserDataActions =
  | IRegUserSuccess
  | IRegUserRequest
  | IRegUserFailed
  | ILogInUserRequest
  | ILogInUserSuccess
  | ILogInUserFailed
  | ILogOutUserRequest
  | ILogOutUserSuccess
  | ILogOutUserFailed
  | ISetAuthChecked
  | IGetUserDataRequest
  | IGetUserDataSuccess
  | IGetUserDataFailed
  | IPostUserDataRequest
  | IPostUserDataSuccess
  | IPostUserDataFailed;

export const getUserData = () => {
  // ИСПРАВИТЬ ТИПИЗАЦИЮ
  return function (dispatch: any) {
    // ИСПРАВИТЬ ТИПИЗАЦИЮ
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
      .catch((err) => {
        dispatch({ type: GET_USER_DATA_FAILED });
        console.log(err);
      });
  };
};

export const regUser = (email: string, password: string, name: string) => {
  // ИСПРАВИТЬ ТИПИЗАЦИЮ
  return function (dispatch: any) {
    // ИСПРАВИТЬ ТИПИЗАЦИЮ
    dispatch({ type: REG_USER_REQUEST });
    apiUserReg(email, password, name)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
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
      .catch((err) => {
        dispatch({
          type: REG_USER_FAILED,
        });
        console.log(err);
      });
  };
};

export const logInUser = (email: string, password: string) => {
  // ИСПРАВИТЬ ТИПИЗАЦИЮ
  return function (dispatch: any) {
    // ИСПРАВИТЬ ТИПИЗАЦИЮ
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
      .catch((err) => {
        dispatch({ type: LOG_IN_USER_FAILED });
        console.log(err);
      });
  };
};

export const logOutUser = () => {
  // ИСПРАВИТЬ ТИПИЗАЦИЮ
  return function (dispatch: any) {
    // ИСПРАВИТЬ ТИПИЗАЦИЮ
    dispatch({ type: LOG_OUT_USER_REQUEST });
    apiUserLogOut()
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({ type: LOG_OUT_USER_SUCCESS });
          dispatch({ type: SET_AUTH_CHECKED, payload: false });
        } else {
          dispatch({ type: LOG_OUT_USER_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: LOG_OUT_USER_FAILED });
        console.log(err);
      });
  };
};

export const postUserData = (login: string, name: string) => {
  // ИСПРАВИТЬ ТИПИЗАЦИЮ
  return function (dispatch: any) {
    // ИСПРАВИТЬ ТИПИЗАЦИЮ
    dispatch({ type: POST_USER_DATA_REQUEST });
    apiPostUser(login, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_USER_DATA_SUCCESS,
            userData: res,
          });
        } else {
          dispatch({
            type: POST_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: POST_USER_DATA_FAILED });
        console.log(err);
      });
  };
};
