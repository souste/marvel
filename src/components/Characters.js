import "./Characters.css";
import { useState, useEffect } from "react";
import searchAPIs from "../api";
import { Link } from "react-router-dom";
import logo from "./marvel-comics-logo.png";

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

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("I've been typed!!", term);
  // };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  const handleClick = (event) => {
    setTerm(event);
  };

  return (
    <div>
      <div className="search-bar-box">
        <img src={logo} alt="marvel-comics-logo" className="logo" />
        <form className="search-bar">
          <input
            value={term}
            onChange={handleChange}
            placeholder="  Search for any Character"
          />
          <div className="search-bar-dropdown">
            {characters
              .filter(
                (item) =>
                  item.name !== term &&
                  item.name.startsWith(term) !== term &&
                  item.thumbnail &&
                  !item.thumbnail.path.includes("image_not_available")
              )
              .map((item) => (
                <div
                  onClick={() => handleClick(item.name)}
                  className="search-bar-dropdown-row"
                >
                  {item.name}
                </div>
              ))}
          </div>
        </form>
      </div>
      <ul className="characters-container">
        {characters
          .filter(
            (character) =>
              character.thumbnail &&
              !character.thumbnail.path.includes("image_not_available")
          )
          .map((character) => {
            return (
              <Link
                to={{ pathname: `characters/${character.id}` }}
                key={character.id}
              >
                <li className="characters-box">
                  <p className="characters-title">{character.name}</p>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.id}
                    className="characters-image"
                  />
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}

export default Characters;
