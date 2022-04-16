import { getArtists } from "../class/artist.js";
import { getEl } from "../global.js";
import { sliderItem } from "../templates/front.js";

const artistList = getEl(".Section__slider--artists");

const artists = getArtists();
const renderArtist = () => {
  artistList.innerHTML = artists
    .slice(0, 5)
    .map((artist) => sliderItem(artist))
    .join("");
};

renderArtist();
