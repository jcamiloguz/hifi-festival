import { getEl, getEls, writeLocalStorage } from "./global.js";
import { getPhotos, photo } from "./class/photo.js";
import { isLogged, logout } from "./admin.js";

import { galleryItem } from "./templates/gallery.js";

//Modal
const modalAdd = getEl(".Modal--add");
const modalEdit = getEl(".Modal--edit");
//Button
const buttonLogout = getEl("#logout");
const buttonAdd = getEl(".Button__add");
const modalClose = getEl(".Modal___exit");
//Inputs form Modal
const inputImage = getEl("#image");
const inputTitle = getEl("#name");
const inputDescription = getEl("#description");
const buttonAddPhoto = getEl("#btnAddPhoto");
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
  buttonsDeletPhoto.map((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.attributes["data-id"].value;
      deletePhoto(id);
    });
  });
};

//Add artist to localStorage
const addPhoto = async () => {
  if (
    //si todos los values son true, es decir si los ingreso
    inputImage.value &&
    inputTitle.value &&
    inputDescription.value
  ) {
    const Photo = new photo(
      inputTitle.value,
      inputDescription.value,
      await getImage(inputImage)
    );
    Photo.savePhoto();
    renderPhoto();

    modalAdd.classList.remove("Modal--active");
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
  modalAdd.classList.add("Modal--active");
});

modalClose.addEventListener("click", (e) => {
  e.preventDefault();
  modalAdd.classList.remove("Modal--active");
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
