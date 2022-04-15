// Wrapper del query selector -- Para tomar elementos del DOM
export const getEl = (el) => document.querySelector(el);
export const getEls = (el) => document.querySelectorAll(el);

//Ver si funciona
export const isLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    return true;
  }
  return false;
};
//Insertar
export const writeLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
//Leer
export const readLocalStorage = (key) => {
  return localStorage.getItem(key);
};
export const getUniqueId = () => {
  return Math.random().toString(36).slice(2, 9);
};
