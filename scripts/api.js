import { delay } from "./utils.js";

// Изменили апи на 2-ю версию
const host = "https://webdev-hw-api.vercel.app/api/v2/mielilon";

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

export function postComment(text, name) {
  return fetch(host + "/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
      name,
    }),
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
