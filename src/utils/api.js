const urlIngredients = "https://norma.nomoreparties.space/api/ingredients";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function apiIngredients() {
  return fetch(urlIngredients).then((res) => checkResponse(res));
}

export function apiOrder(ingredientsData) {
  return fetch("https://norma.nomoreparties.space/api/orders", {
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
