import { Artist, getArtists } from "./class/artist.js";
import { isLogged, logout } from "./admin.js";

import { getEl } from "./global.js";

const artistItem = ({ name, genre, description, image }) => `
<div class="Artist__item">
<img
  class="Artist__item__img"
  src="${image}"
  alt=""
/>
<ul class="Artist__item__info">
  <li class="Artist__item__title">${name}</li>
  <li class="Artist__item__genere">${genre}</li>
  <li class="Artist__item__description">${description}</li>
</ul>
<div class="Artist__item__icons">
  <span class="material-icons Artist__item__edit"> edit </span>
  <span class="material-icons Artist__item__delete"> delete </span>
</div>
</div>
`;

const buttonLogout = getEl("#logout");
const buttonAdd = getEl(".Button__add");
const modal = getEl(".Modal");
const modalClose = getEl(".Modal___exit");
//Inputs fomr modal
const inputImage = getEl("#image");
const inputName = getEl("#name");
const inputGenre = getEl("#genre");
const inputDescription = getEl("#description");
const inputSpotify = getEl("#spotify");
const inputInstagram = getEl("#instagram");
const buttonAddArtist = getEl("#btnAddArtist");
const artistList = getEl("#Artist__list");
const canvas = getEl("#canvas");
console.log("aa ");
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

inputImage.addEventListener("change", async (e) => {
  e.preventDefault();
  const image = await getImage(inputImage);
  console.log(image);
  displayImage(canvas, image);
});

buttonAddArtist.addEventListener("click", (e) => {
  e.preventDefault();
  addArtist();
});

const addArtist = async () => {
  if (
    inputImage.value &&
    inputName.value &&
    inputGenre.value &&
    inputDescription.value &&
    inputSpotify.value &&
    inputInstagram.value
  ) {
    const artist = new Artist(
      inputName.value,
      inputGenre.value,
      inputDescription.value,
      inputSpotify.value,
      inputInstagram.value,
      await getImage(inputImage)
    );
    artist.saveArtist();
    renderArtist();

    modal.classList.remove("Modal--active");
    canvas.src = "";
    inputImage.value = "";
    inputName.value = "";
    inputGenre.value = "";
    inputDescription.value = "";
    inputSpotify.value = "";
    inputInstagram.value = "";
  } else {
    alert("Please fill all fields");
  }
};

const renderArtist = () => {
  const artists = getArtists();
  console.log(artists);
  artistList.innerHTML = artists.map((artist) => artistItem(artist)).join("");
};
renderArtist();
