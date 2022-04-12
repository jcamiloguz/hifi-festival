const getEl = (el) => document.querySelector(el);

const writeLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
}

const readLocalStorage = (key) => {
  return localStorage.getItem(key);
}

const veryfyLocalStorage = (key) => {
  if(typeof localStorage !== 'undefined'){
    return true;
  }
  return false;
}



export {
  getEl,
  writeLocalStorage,
  readLocalStorage,
  veryfyLocalStorage
}