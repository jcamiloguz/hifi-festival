import { Artist, getArtists } from "../class/artist.js";
import { getEl, getEls, writeLocalStorage } from "../global.js";
import { isLogged, logout } from "./admin.js";

import { artistItem } from "../templates/admin.js";

const EMPTY_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs";

const modal = getEl(".Modal");
// Buttons
const buttonLogout = getEl("#logout");
const modalClose = getEl(".Modal___exit");
const buttonAdd = getEl(".Button__add");
//Inputs fomr modal
const inputImage = getEl("#image");
const inputName = getEl("#name");
const inputGenre = getEl("#genre");
const inputDescription = getEl("#description");
const inputSpotify = getEl("#spotify");
const inputInstagram = getEl("#instagram");
const buttonAddArtist = getEl("#btnAddArtist");
const buttonEditArtist = getEl("#btnEditArtist");
const modalTitle = getEl(".Modal .Section__title");

// list for fill with artists
const artistList = getEl("#Artist__list");
// Canvas for image
const canvas = getEl("#canvas");

//Render artists in artistList
const renderArtist = () => {
  const artists = getArtists();
  console.log(artists);
  artistList.innerHTML = artists.map((artist) => artistItem(artist)).join("");
  const buttonsDeletArtist = Array.from(getEls(".Artist__item__delete"));
  const buttonsEditArtist = Array.from(getEls(".Artist__item__edit"));
  buttonsDeletArtist.map((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.attributes["data-id"].value;
      deleteArtist(id);
    });
  });
  buttonsEditArtist.map((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.attributes["data-id"].value;
      openModalEdit(id);
    });
  });
};

//Add artist to localStorage
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
const deleteArtist = (id) => {
  const artists = getArtists();
  const newArtists = artists.filter((artist) => artist.id !== id);
  writeLocalStorage("artists", JSON.stringify(newArtists));
  renderArtist();
};

const openModalEdit = (id) => {
  modal.classList.add("Modal--active");
  modalTitle.innerHTML = "EDIT ARTIST";
  buttonEditArtist.classList.remove("hidden");
  buttonAddArtist.classList.add("hidden");
  const artists = getArtists();
  const artist = artists.find((artist) => artist.id === id);
  displayImage(canvas, artist.image);
  inputName.value = artist.name;
  inputGenre.value = artist.genre;
  inputDescription.value = artist.description;
  inputSpotify.value = artist.spotify;
  inputInstagram.value = artist.instagram;
  buttonEditArtist.addEventListener("click", function handler(e) {
    e.preventDefault();
    editArtist(id);
    this.removeEventListener("click", handler);
  });
};
const editArtist = async (id) => {
  console.log(
    inputName.value &&
      inputGenre.value &&
      inputDescription.value &&
      inputSpotify.value &&
      inputInstagram.value
  );
  if (
    inputName.value &&
    inputGenre.value &&
    inputDescription.value &&
    inputSpotify.value &&
    inputInstagram.value
  ) {
    let image;
    if (inputImage.value) {
      image = await getImage(inputImage);
    } else {
      image = canvas.src;
    }
    const artist = new Artist(
      inputName.value,
      inputGenre.value,
      inputDescription.value,
      inputSpotify.value,
      inputInstagram.value,
      image
    );
    artist.update(id);
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

// verify if user is logged
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
  modalTitle.innerHTML = "ADD ARTIST";
  buttonAddArtist.classList.remove("hidden");
  buttonEditArtist.classList.add("hidden");
  //clean form
  displayImage(canvas, EMPTY_IMAGE);
  inputImage.value = "";
  inputName.value = "";
  inputGenre.value = "";
  inputDescription.value = "";
  inputSpotify.value = "";
  inputInstagram.value = "";
});

modalClose.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("Modal--active");
});

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

renderArtist();
