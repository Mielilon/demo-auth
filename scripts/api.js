import { delay } from "./utils.js";

// Изменили апи на 2-ю версию
const host = "https://webdev-hw-api.vercel.app/api/v2/mielilon";
const loginHost = "https://webdev-hw-api.vercel.app/api/user/login";

export function fetchComments() {
  return fetch(host + "/comments")
    .then((res) => res.json())
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

      return appComments;
    });
}

export function fetchLogin(login, password) {
  return fetch(loginHost, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    // Нужно сделать обработку ошибок

    return response.json();
  });
}

export function postComment(text, token) {
  return fetch(host + "/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      // Не забудьте про Bearer!
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }

      if (response.status === 400) {
        throw new Error("Неверный запрос");
      }
    })
    .then(() => () => delay())
    .then(() => {
      return fetchComments();
    })
    .then((data) => delay(data));
}
