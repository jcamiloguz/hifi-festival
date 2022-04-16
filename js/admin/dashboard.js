import { isLogged, logout } from "./admin.js";

import { getEl } from "../global.js";

const button = getEl("#logout");

if (!isLogged()) {
  window.location.href = "./login.html";
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
  window.location.href = "./login.html";
});
