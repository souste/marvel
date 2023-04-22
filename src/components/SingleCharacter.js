import "./SingleCharacter.css";
import Comics from "./Comics";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import searchAPIs from "../api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function SingleCharacter() {
  const { character_id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    searchAPIs.searchCharacter(character_id).then((data) => {
      console.log(data[0]);
      setCharacter(data[0]);
    });
  }, [character_id]);

  return (
    <div className="divider-color">
      <Link to={{ pathname: `/` }}>
        <FontAwesomeIcon icon={faTimes} className="character-back-button" />
      </Link>
      <li className="single-character-box">
        {character.thumbnail && (
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.id}
            className="character-image"
          />
        )}
        <div className="name-and-description-container">
          <h1 className="character-name">{character.name}</h1>
          {character.description ? (
            <p className="character-description">{character.description}</p>
          ) : (
            <p className="character-no-description">
              No Description provided for this character
            </p>
          )}
        </div>
      </li>
      <h2 className="comics-title">Comics</h2>
      <Comics />
    </div>
  );
}

export default SingleCharacter;
