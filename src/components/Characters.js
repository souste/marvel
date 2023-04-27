import "./Characters.css";
import { useState, useEffect } from "react";
import searchAPIs from "../api";
import { Link } from "react-router-dom";
import logo from "./marvel-comics-logo.png";

function Characters() {
  const [term, setTerm] = useState("");
  const [characters, setCharacters] = useState([]);
  // const [dropdownVisible, setDropdownVisible] = useState(false);

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
    // setDropdownVisible(true);
  };

  // const handleClick = (item) => {
  //   setTerm(item.name);
  //   setCharacters([item]);
  //   setDropdownVisible(false);
  // };

  // useEffect(() => {
  //   const handleOutsideDropdownClick = (event) => {
  //     const dropdown = document.querySelector(".search-bar-dropdown");
  //     if (dropdown && !dropdown.contains(event.target)) {
  //       setDropdownVisible(false);
  //     }
  //   };
  //   document.addEventListener("click", handleOutsideDropdownClick);

  //   return () => {
  //     document.removeEventListener("click", handleOutsideDropdownClick);
  //   };
  // });

  return (
    <div>
      <div className="search-bar-box">
        <img src={logo} alt="marvel-comics-logo" className="logo" />
        <form className="search-bar">
          <input
            onSubmit={handleSearchSubmit}
            value={term}
            onChange={handleChange}
            placeholder="  Search for any Character"
            className="characters-search-bar"
          />
          {/* {dropdownVisible && (
            <div className="search-bar-dropdown">
              {characters
                .filter(
                  (item) =>
                    item.thumbnail &&
                    !item.thumbnail.path.includes("image_not_available")
                )
                .map((item) => (
                  <div
                    // onClick={() => handleClick(item)}
                    className="search-bar-dropdown-row"
                  >
                    {item.name}
                  </div>
                ))}
            </div>
          )} */}
        </form>
      </div>
      {term ? (
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
                  className="characters-link"
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
      ) : (
        <div className="instructions-container">
          <div className="no-search-welcome-instructions">
            <h1 className="no-search-welcome-instructions-title">
              Welcome to The Marvel Comics Database.
            </h1>
            <p className="no-search-welcome-instructions-text">
              1. Search for any Marvel Character.
            </p>
            <p className="no-search-welcome-instructions-text">
              2. Click on that Character for more detailed information and a
              list of that Character's comics.
            </p>
            <p className="no-search-welcome-instructions-text">
              3. Search for any Comic involving that Character and click on that
              Comic for more detailed information.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Characters;
