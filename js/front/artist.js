import { Artist, getArtists } from "../class/artist.js";
import { artistBubble, artistInfo } from "../templates/front.js";
import { getEl, getEls } from "../global.js";

const artistsList = getEl(".Artist__wrapper");
const artistInfoContainer = getEl(".Artist__container--display");
const artists = getArtists();

const renderArtist = () => {
  artistsList.innerHTML = artists
    .map((artist) => artistBubble(artist))
    .join("");

  const bubbles = Array.from(getEls(".Artist__item--wrapper"));

  bubbles.map((bubble) => {
    bubble.addEventListener("click", (e) => {
      console.log(e.target.parentElement);
      const container = e.target.parentElement;
      const id = container.attributes["data-id"].value;
      console.log(id);
      showArtist(id);
    });
  });
  return artists[0].id;
};

const showArtist = (id) => {
  artistInfoContainer.innerHTML = artistInfo(
    artists.find((artist) => artist.id === id)
  );
};

const fistArtistId = renderArtist();
showArtist(fistArtistId);
