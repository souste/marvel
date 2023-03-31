import "./SingleCharacter.css";
import Comics from "./Comics";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import searchAPIs from "../api";

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
    <div>
      <li className="single-character-box">
        <h1>{character.name}</h1>
        {character.thumbnail && (
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.id}
          />
        )}
        {character.description ? (
          <p>{character.description}</p>
        ) : (
          <p>No Description provided for this character</p>
        )}
        <Comics />
      </li>
    </div>
  );
}

export default SingleCharacter;
