import { getUniqueId, readLocalStorage, writeLocalStorage } from "../global.js";

export class Artist {
  constructor(name, genre, description, spotify, instagram, image) {
    this.name = name;
    this.genre = genre;
    this.description = description;
    this.spotify = spotify;
    this.instagram = instagram;
    this.image = image;
    this.id = getUniqueId();
  }

  saveArtist() {
    const artist = {
      name: this.name,
      genre: this.genre,
      description: this.description,
      spotify: this.spotify,
      instagram: this.instagram,
      image: this.image,
      id: this.id,
    };

    const artists = getArtists();
    artists.push(artist);
    writeLocalStorage("artists", JSON.stringify(artists));
  }
  update(id) {
    const newArtist = {
      name: this.name,
      genre: this.genre,
      description: this.description,
      spotify: this.spotify,
      instagram: this.instagram,
      image: this.image,
      id: id,
    };
    const artists = getArtists();
    const newArtists = artists.map((artist) => {
      if (artist.id === id) {
        return newArtist;
      }
      return artist;
    });
    writeLocalStorage("artists", JSON.stringify(newArtists));
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
