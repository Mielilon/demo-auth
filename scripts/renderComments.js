import { sanitizeHtml } from "./utils.js";
import { delay } from "./utils.js";

export const renderComments = (app, isInitialLoading, comments) => {
  // const likeButtonClass = "like-button";
  // if (isInitialLoading) {
  //   document.getElementById("comments").innerHTML =
  //     "Пожалуйста подождите, загружаю комментарии...";
  //   return;
  // }
  // document.getElementById("comments").innerHTML = comments
  //   .map((comment, index) => {
  //     return `
  //      <li class="comment" data-index="${index}">
  //        <div class="comment-header">
  //          <div>${sanitizeHtml(comment.name)}</div>
  //          <div>${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}</div>
  //        </div>
  //        <div class="comment-body">
  //          <div class="comment-text">
  //            ${sanitizeHtml(
  //              comment.text
  //                .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
  //                .replaceAll("END_QUOTE%", "</div>")
  //            )}
  //          </div>
  //        </div>
  //        <div class="comment-footer">
  //          <div class="likes">
  //            <span class="likes-counter">${comment.likes}</span>
  //            <button data-index="${index}" class="${likeButtonClass} ${
  //       comment.isLiked ? "-active-like" : ""
  //     } ${comment.isLikeLoading ? "-loading-like" : ""}"></button>
  //          </div>
  //        </div>
  //      </li>
  //    `;
  //   })
  //   .join("");
  // for (const likeButton of document.querySelectorAll(`.${likeButtonClass}`)) {
  //   likeButton.addEventListener("click", (event) => {
  //     event.stopPropagation();
  //     const comment = comments[likeButton.dataset.index];
  //     comment.isLikeLoading = true;
  //     renderComments(isInitialLoading, comments);
  //     delay(2000).then(() => {
  //       comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
  //       comment.isLiked = !comment.isLiked;
  //       comment.isLikeLoading = false;
  //       renderComments(isInitialLoading, comments);
  //     });
  //   });
  // }
  // for (const comment of document.querySelectorAll(".comment")) {
  //   comment.addEventListener("click", () => {
  //     const text = document.getElementById("text-input");
  //     text.value = `%BEGIN_QUOTE${comments[comment.dataset.index].name}:
  //        ${comments[comment.dataset.index].text}END_QUOTE%`;
  //   });
  // }

  console.log("renderComments");
  app.innerHTML = "Код работает!";
};
