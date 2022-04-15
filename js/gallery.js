import { Photo, getPhotos } from "./class/photo.js";
import { getEl, getEls, writeLocalStorage } from "./global.js";
import { isLogged, logout } from "./admin.js";

import { galleryItem } from "./templates/gallery.js";

const EMPTY_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs";

//Modal
const modal = getEl(".Modal--add");
//Button
const buttonLogout = getEl("#logout");
const buttonAdd = getEl(".Button__add");
const modalClose = getEl(".Modal___exit");
//Inputs form Modal
const inputImage = getEl("#image");
const inputTitle = getEl("#name");
const inputDescription = getEl("#description");
const buttonAddPhoto = getEl("#btnAddPhoto");
const buttonEditPhoto = getEl("#btnEditPhoto");
const modalTitle = getEl(".Modal .Section__title");

//Output de la imagen
const canvas = getEl("#canvas");
//Output de la lista de fotos creadas por el admin
const galerryList = getEl("#Gallery__list");

//Render artists in galerryList (mostrar la lista de fotos agregadas)
const renderPhoto = () => {
  const photos = getPhotos();
  console.log(photos);
  galerryList.innerHTML = photos.map((photo) => galleryItem(photo)).join("");
  const buttonsDeletPhoto = Array.from(getEls(".Gallery__item__delete"));
  const buttonsEditPhoto = Array.from(getEls(".Gallery__item__edit"));

  buttonsDeletPhoto.map((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.attributes["data-id"].value;
      deletePhoto(id);
    });
  });
  buttonsEditPhoto.map((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.attributes["data-id"].value;
      openModalEdit(id);
    });
  });
};

//Add Photo to localStorage
const addPhoto = async () => {
  if (
    //si todos los values son true, es decir si los ingreso
    inputImage.value &&
    inputTitle.value &&
    inputDescription.value
  ) {
    const photo = new Photo(
      inputTitle.value,
      inputDescription.value,
      await getImage(inputImage)
    );
    photo.savePhoto();
    renderPhoto();

    modal.classList.remove("Modal--active");
    canvas.src = "";
    inputImage.value = "";
    inputTitle.value = "";
    inputDescription.value = "";
  } else {
    alert("Please fill all fields");
  }
};

// replace image in canvas
function displayImage(imgElement, src) {
  imgElement.src = src;
}

// get image from input and convert to base64
async function getImage(input) {
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export const deletePhoto = (id) => {
  const photos = getPhotos();
  const newPhotos = photos.filter((photo) => photo.id !== id);
  writeLocalStorage("photos", JSON.stringify(newPhotos));
  renderPhoto();
};

const openModalEdit = (id) => {
  modal.classList.add("Modal--active");
  modalTitle.innerHTML = "EDIT PHOTO";
  buttonEditPhoto.classList.remove("hidden");
  buttonAddPhoto.classList.add("hidden");
  const photos = getPhotos();
  const photo = photos.find((photo) => photo.id === id);
  displayImage(canvas, photo.image);
  inputTitle.value = photo.title;
  inputDescription.value = photo.description;
  buttonEditPhoto.addEventListener("click", function handler(e) {
    e.preventDefault();
    editPhoto(id);
    this.removeEventListener("click", handler);
  });
};

const editPhoto = async (id) => {
  console.log(inputTitle.value && inputDescription.value);
  if (inputTitle.value && inputDescription.value) {
    let image;
    if (inputImage.value) {
      image = await getImage(inputImage);
    } else {
      image = canvas.src;
    }
    const photo = new Photo(inputTitle.value, inputDescription.value, image);
    photo.update(id);
    renderPhoto();

    modal.classList.remove("Modal--active");
    canvas.src = "";
    inputImage.value = "";
    inputTitle.value = "";
    inputDescription.value = "";
  } else {
    alert("Please fill all fields");
  }
};

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
  buttonAddPhoto.classList.remove("hidden");
  buttonEditPhoto.classList.add("hidden");
  //clean form
  displayImage(canvas, EMPTY_IMAGE);
  inputImage.value = "";
  inputTitle.value = "";
  inputDescription.value = "";
});

modalClose.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("Modal--active");
});

inputImage.addEventListener("change", async (e) => {
  e.preventDefault();
  try {
    const image = await getImage(inputImage);
    console.log(image);
    displayImage(canvas, image);
  } catch (err) {
    console.log(err);
  }
});

buttonAddPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  addPhoto();
});

renderPhoto();
