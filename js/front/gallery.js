import { Photo, getPhotos } from "../class/photo.js";
import { photoItem, photoBackground } from "../templates/front.js";
import { getEl, getEls } from "../global.js";

const photoList = getEl(".Photo__wrapper");
const photoInfoConainers = getEl(".Hero");
const photo = getPhotos();

const renderPhoto = () => {
  photoList.innerHTML = photo.map((photo) => photoItem(photo)).join("");
  const photos = Array.from(getEls(".Photo__container"));
  photos.map((photo) => {
    photo.addEventListener("click", (e) => {
      const container = e.target.parentElement;
      console.log(e.target.parentElement);
      const id = container.attributes["data-id"].value;
      console.log(id);
      showPhoto(id);
    });
  });
  return photo[0].id;
};

const showPhoto = (id) => {
  const photoToHero = photo.find((photo) => photo.id === id);
  console.log(photoToHero);
  photoInfoConainers.innerHTML = photoBackground(photoToHero);
};

const fistPhotoId = renderPhoto();
showPhoto(fistPhotoId);
