import { fetchComments, postComment } from "./api.js";
import { renderComments } from "./renderComments.js";
import { delay } from "./utils.js";

// const name = document.getElementById("name-input");
// const text = document.getElementById("text-input");

const app = document.getElementById("app");

let comments = [];

let isInitialLoading = true;
let isPosting = false;

fetchComments()
  .then((data) => delay(data))
  .then((data) => {
    comments = data;
    isInitialLoading = false;
    renderComments(app, isPosting, isInitialLoading, comments);
  })
  .catch((error) => {
    alert(error.message);
  });

renderComments(app, isPosting, isInitialLoading, comments);

const addButton = document.getElementById("add-button");

const handlePostClick = () => {
  if (!name.value || !text.value) {
    alert("Заполните форму");
    return;
  }

  isPosting = true;
  document.querySelector(".form-loading").style.display = "block";
  document.querySelector(".add-form").style.display = "none";
  renderComments(app, isPosting, isInitialLoading, comments);

  postComment(text.value, name.value)
    .then((data) => {
      name.value = "";
      text.value = "";
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";
      isPosting = false;
      comments = data;
      renderComments(app, isPosting, isInitialLoading, comments);
    })
    .catch((error) => {
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";
      isPosting = false;

      if (error.message === "Ошибка сервера") {
        handlePostClick();
        alert("Сервер сломался, попробуй позже");
      }

      if (error.message === "Неверный запрос") {
        alert("Имя и комментарий должны быть не короче 3х символов");

        name.classList.add("-error");
        text.classList.add("-error");
        setTimeout(() => {
          name.classList.remove("-error");
          text.classList.remove("-error");
        }, 2000);
      }
    });

  renderComments(app, isPosting, isInitialLoading, comments);
};

// addButton.addEventListener("click", handlePostClick);
