const url = "https://norma.nomoreparties.space/api/ingredients";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export default function api() {
  return fetch(url).then((res) => checkResponse(res));
}
