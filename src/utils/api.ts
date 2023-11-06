import { TIngredient } from "../types/types";

const BASE_URL = "https://norma.nomoreparties.space/api/";

function checkResponse(res: Response) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const refreshToken = () => {
  return fetch(`${BASE_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => checkResponse(res));
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    console.log(err);
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function apiIngredients() {
  return fetch(BASE_URL + "ingredients").then((res) => checkResponse(res));
}

export function apiOrder(ingredientsData: ReadonlyArray<TIngredient>) {
  return fetch(BASE_URL + "orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${localStorage.getItem("accessToken")}`, // если убрать шаблонную строку, то ts жалуется на то, что authorization не является строчко
    },
    body: JSON.stringify({
      ingredients: ingredientsData.map((el) => {
        return el._id;
      }),
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export const apiUserReg = (email: string, password: string, name: string) => {
  return fetch(BASE_URL + "auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

export const apiUserLogIn = (email: string, password: string) => {
  return fetch(BASE_URL + "auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

export const apiUserLogOut = () => {
  return fetch(BASE_URL + "auth/logout", {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

export const apiGetUser = () => {
  return fetchWithRefresh(BASE_URL + "auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const apiForgotPassword = (email: string) => {
  return fetch(BASE_URL + "password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

export const apiResetPassword = (password: string, token: string) => {
  return fetch(BASE_URL + "password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      password: password,
      token: token,
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

export const apiPostUser = (email: string, name: string) => {
  return fetchWithRefresh(BASE_URL + "auth/user", {
    method: "PATCH",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
      email: email,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  }).catch((err) => console.log(err));
};
