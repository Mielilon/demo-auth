import { delay } from "./utils.js";

const host = "https://webdev-hw-api.vercel.app/api/v1/mielilon";

export function fetchComments() {
  return fetch(host + "/comments")
    .then((res) => res.json())
    .then((responseData) => {
      // Преобразовываем данные из формата api в формат приложения
      const appComments = responseData.comments.map((comment) => {
        return {
          // Достаем имя автора
          name: comment.author.name,
          // Преобразовываем дату-строку в Date
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          // В api пока вообще нет признака лайкнутости
          // Поэтому пока добавляем заглушку
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
