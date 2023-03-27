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
    console.log(response.data.data.results);
  } catch (error) {
    console.error(error);
  }
};

const searchAPIs = { searchCharacters };

export default searchAPIs;
