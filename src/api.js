import axios from "axios";
import md5 from "md5";

const searchCharacters = async (term) => {
  const publicKey = "fda0ea1f82b4a660addf30cff2441d84";
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${privateKey}${publicKey}`);

  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${term}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    );

    return response.data.data.results;
  } catch (error) {
    console.error(error);
  }
};

const searchCharacter = async (character_id) => {
  const publicKey = "fda0ea1f82b4a660addf30cff2441d84";
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${privateKey}${publicKey}`);

  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${character_id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    );
    return response.data.data.results;
  } catch (error) {
    console.error(error);
  }
};

const searchComicsByCharacterId = async (
  character_id,
  // limit = 50,
  // offset = 0,
  term = ""
) => {
  const publicKey = "fda0ea1f82b4a660addf30cff2441d84";
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${privateKey}${publicKey}`);

  try {
    let url = `http://gateway.marvel.com/v1/public/characters/${character_id}/comics?&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    if (term) {
      url += `&titleStartsWith=${term}`;
    }
    const response = await axios.get(url);
    return response.data.data.results;
  } catch (error) {
    console.error(error);
  }
};

// http://gateway.marvel.com/v1/public/characters/${character_id}/comics?&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}&titleStartsWith=${term}

const searchComicsByComicID = async (comic_id) => {
  const publicKey = "fda0ea1f82b4a660addf30cff2441d84";
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${privateKey}${publicKey}`);

  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics/${comic_id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    );
    return response.data.data.results;
  } catch (error) {
    console.error(error);
  }
};

const searchAPIs = {
  searchCharacters,
  searchCharacter,
  searchComicsByCharacterId,
  searchComicsByComicID,
};

export default searchAPIs;
