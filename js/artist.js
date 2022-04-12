import { readLocalStorage, veryfyLocalStorage, writeLocalStorage } from './global.js';

export class artist {
    constructor(name, genre, id, description, spotify, instagram) {
        this.name = name;
        this.genre = genre;
        this.description = description;
        this.spotify = spotify;
        this.instagram = instagram;
        this.id = id;
    }
 
    saveArtist() {
        const artist = {
            name: this.name,
            genre: this.genre,
            description: this.description,
            spotify: this.spotify,
            instagram: this.instagram,
            id: this.id
        }
        if(veryfyLocalStorage('artists')) {
            const artists = readLocalStorage('artists');
            artists.push(artist);
            writeLocalStorage('artists', JSON.stringify(artists));
        } else {
            const artists = [];
            artists.push(artist);
            writeLocalStorage('artists', JSON.stringify(artists));
        }
    }

    getArtists() {
        if(veryfyLocalStorage('artists')) {
            const artists = readLocalStorage('artists');
            return JSON.parse(artists);
        } else {
            return [];
        }
    }
    

}