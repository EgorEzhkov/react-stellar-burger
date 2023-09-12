import {
  REG_USER_FAILED,
  REG_USER_REQUEST,
  REG_USER_SUCCESS,
  LOG_IN_USER_REQUEST,
  LOG_IN_USER_FAILED,
  LOG_IN_USER_SUCCESS,
  SET_AUTH_CHECKED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SUCCESS,
  LOG_OUT_USER_FAILED,
  LOG_OUT_USER_REQUEST,
  LOG_OUT_USER_SUCCESS,
} from "../actions/userData";

const initialState = {
  userReg: {},
  userLogIn: {},
  userData: {},
  registerUserRequest: false,
  registerUserSuccess: false,
  registerUserFailed: false,
  logInUserRequest: false,
  logInUserSuccess: false,
  logInUserFailed: false,
  getUserDataRequest: false,
  getUserDataSuccess: false,
  getUserDataFailed: false,
  isAuthenticated: false,
  logOutUserRequest: false,
  logOutUserSuccess: false,
  logOutUserFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REG_USER_REQUEST: {
      return { ...state, registerUserRequest: true };
    }
    case REG_USER_SUCCESS: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserFailed: false,
        registerUserSuccess: true,
        userReg: action.userDataReg,
        isAuthenticated: true,
      };
    }
    case REG_USER_FAILED: {
      return {
        ...state,
        registerUserFailed: true,
        registerUserRequest: false,
        registerUserSuccess: false,
      };
    }
    case LOG_IN_USER_REQUEST: {
      return {
        ...state,
        logInUserRequest: true,
      };
    }
    case LOG_IN_USER_SUCCESS: {
      return {
        ...state,
        logInUserRequest: false,
        logInUserFailed: false,
        logInUserSuccess: true,
        userLogIn: action.userDataLogIn,
        isAuthenticated: true,

      };
    }
    case LOG_IN_USER_FAILED: {
      return {
        ...state,
        logInUserFailed: true,
        logInUserRequest: false,
        logInUserSuccess: false,
      };
    }
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        getUserDataRequest: true,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        getUserDataRequest: false,
        getUserDataSuccess: true,
        getUserDataFailed: false,
        userData: action.userData,
        isAuthenticated: true,
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        getUserDataFailed: true,
        getUserDataRequest: false,
        getUserDataSuccess: false,
      };
    }
    case LOG_OUT_USER_REQUEST: {
      return {
        ...state,
        logOutUserRequest: true,
      };
    }
    case LOG_OUT_USER_SUCCESS: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserSuccess: false,
        registerUserFailed: false,
        logInUserRequest: false,
        logInUserSuccess: false,
        logInUserFailed: false,
        getUserDataRequest: false,
        getUserDataSuccess: false,
        getUserDataFailed: false,
        isAuthenticated: false,
        logOutUserRequest: false,
        logOutUserSuccess: true,
        logOutUserFailed: false,
      };
    }
    case LOG_OUT_USER_FAILED: {
      return {
        logOutUserFailed: true,
        logOutUserRequest: false
      };
    }
    default: {
      return state;
    }
  }
};
