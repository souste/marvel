import "./Characters.css";
import { useState, useEffect } from "react";
import searchAPIs from "../api";

function Characters() {
  const [term, setTerm] = useState("");
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (term) {
      searchAPIs.searchCharacters(term).then((data) => {
        console.log("app response", data);
        setCharacters(data);
      });
    }
  }, [term]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("I've been typed!!", term);
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="search-bar-box">
        <input value={term} onChange={handleChange} />
      </form>
      <ul>
        {characters.map((character) => {
          return (
            <li className="characters-box">
              <p>{character.name}</p>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.id}
                className="characters-image"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Characters;
