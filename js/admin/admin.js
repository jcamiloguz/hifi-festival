import { crypt, readLocalStorage, writeLocalStorage } from "../global.js";

const USERNAME = "admin";
const PASSWORD = "2724252223";

export const isLogged = () => {
  if (readLocalStorage("logged") === "true") {
    return true;
  } else {
    logout();
  }
  return false;
};

export const login = (username, password) => {
  const cryptedPassword = crypt(password);
  console.info(`Password:${password} cryptedPassword: ${cryptedPassword}`);
  if (username === USERNAME && cryptedPassword === PASSWORD) {
    writeLocalStorage("logged", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  writeLocalStorage("logged", "false");
};
