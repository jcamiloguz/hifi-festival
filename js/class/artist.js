import { readLocalStorage, writeLocalStorage } from "../global.js";

export class Artist {
  constructor(name, genre, description, spotify, instagram, image) {
    this.name = name;
    this.genre = genre;
    this.description = description;
    this.spotify = spotify;
    this.instagram = instagram;
    this.image = image;
  }

  saveArtist() {
    const artist = {
      name: this.name,
      genre: this.genre,
      description: this.description,
      spotify: this.spotify,
      instagram: this.instagram,
      image: this.image,
    };
    const artists = getArtists();
    artists.push(artist);
    writeLocalStorage("artists", JSON.stringify(artists));
  }
}

export const getArtists = () => {
  if (readLocalStorage("artists")) {
    const artists = readLocalStorage("artists");
    return JSON.parse(artists);
  } else {
    return [];
  }
};
