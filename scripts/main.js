import { fetchComments, postComment } from "./api.js";

const name = document.getElementById("name-input");
const text = document.getElementById("text-input");

let comments = [];

let isInitialLoading = true;
let isPosting = false;

fetchComments()
  .then((data) => delay(data))
  .then((data) => {
    comments = data;
    isInitialLoading = false;
    renderComments();
  })
  .catch((error) => {
    alert(error.message);
  });

// тоже вынесена в модуль
// Добавлено в 3 домашке
const sanitizeHtml = (htmlString) => {
  return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

// вынесена в модуль
const renderComments = () => {
  const likeButtonClass = "like-button";

  if (isInitialLoading) {
    document.getElementById("comments").innerHTML =
      "Пожалуйста подождите, загружаю комментарии...";
    return;
  }

  document.getElementById("comments").innerHTML = comments
    .map((comment, index) => {
      return `
       <li class="comment" data-index="${index}">
         <div class="comment-header">
           <div>${sanitizeHtml(comment.name)}</div>
           <div>${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}</div>
         </div>
         <div class="comment-body">
           <div class="comment-text">
             ${sanitizeHtml(
               comment.text
                 .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
                 .replaceAll("END_QUOTE%", "</div>")
             )}
           </div>
         </div>
         <div class="comment-footer">
           <div class="likes">
             <span class="likes-counter">${comment.likes}</span>
             <button data-index="${index}" class="${likeButtonClass} ${
        comment.isLiked ? "-active-like" : ""
      } ${comment.isLikeLoading ? "-loading-like" : ""}"></button>
           </div>
         </div>
       </li>
     `;
    })
    .join("");

  for (const likeButton of document.querySelectorAll(`.${likeButtonClass}`)) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const comment = comments[likeButton.dataset.index];
      comment.isLikeLoading = true;

      renderComments();
      delay(2000).then(() => {
        comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comment.isLikeLoading = false;
        renderComments();
      });
    });
  }

  for (const comment of document.querySelectorAll(".comment")) {
    comment.addEventListener("click", () => {
      text.value = `%BEGIN_QUOTE${comments[comment.dataset.index].name}:
         ${comments[comment.dataset.index].text}END_QUOTE%

`;
    });
  }
};

renderComments();

const addButton = document.getElementById("add-button");

const handlePostClick = () => {
  if (!name.value || !text.value) {
    alert("Заполните форму");
    return;
  }

  isPosting = true;
  document.querySelector(".form-loading").style.display = "block";
  document.querySelector(".add-form").style.display = "none";
  renderComments();

  postComment(text.value, name.value)
    .then((data) => {
      name.value = "";
      text.value = "";
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";
      isPosting = false;
      comments = data;
      renderComments();
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

  renderComments();
};

addButton.addEventListener("click", handlePostClick);

function delay(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 300);
  });
}
