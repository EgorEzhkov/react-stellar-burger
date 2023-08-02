const BASE_URL = "https://norma.nomoreparties.space/api/";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function apiIngredients() {
  return fetch(BASE_URL + 'ingredients').then((res) => checkResponse(res));
}

export function apiOrder(ingredientsData) {
  return fetch(BASE_URL + "orders", {
    method: "POST",
    body: JSON.stringify({
      ingredients: ingredientsData.map((el) => {
        return el._id;
      }),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
}
