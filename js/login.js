import { getEl, isLocalStorage } from "./global.js";
import { isLogged, login } from "./admin.js";

const username = getEl("#username");
const password = getEl("#password");
const button = getEl("#login__button");

if (isLogged()) {
  window.location.href = "./dashboard.html";
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (isLocalStorage()) {
    if (login(username.value, password.value)) {
      window.location.href = "./dashboard.html";
    } else {
      alert("Invalid username or password");
    }
  } else {
    alert("No se puede acceder a la página, actualiza tu navegador");
  }
});
