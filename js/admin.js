import { readLocalStorage, writeLocalStorage } from "./global.js";

const USERNAME = "admin";
const PASSWORD = "12345";

export const isLogged = () => {
  if (readLocalStorage("logged") === "true") {
    return true;
  } else {
    logout();
  }
  return false;
};

export const login = (username, password) => {
  if (username === USERNAME && password === PASSWORD) {
    writeLocalStorage("logged", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  writeLocalStorage("logged", "false");
};
