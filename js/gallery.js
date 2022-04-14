import { isLogged, logout } from "./admin.js";

import { getEl } from "./global.js";

const buttonLogout = getEl("#logout");
const buttonAdd = getEl(".Button__add");
const modal = getEl(".Modal");
const modalClose = getEl(".Modal___exit");

if (!isLogged()) {
  window.location.href = "./login.html";
}

buttonLogout.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
  window.location.href = "./login.html";
});

buttonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("Modal--active");
});

modalClose.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("Modal--active");
});
