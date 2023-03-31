import "./Comics.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import searchAPIs from "../api";

function Comics() {
  const { character_id } = useParams();
  const [comics, setComics] = useState([]);

  useEffect(() => {
    searchAPIs.searchComicsByCharacterId(character_id).then((data) => {
      console.log("these are the comics", data);
      setComics(data);
    });
  }, [character_id]);

  return (
    <div>
      <h2>Comics</h2>
      <ul>
        {comics.map((comic) => {
          return (
            <li className="comics-box">
              <p>{comic.title}</p>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.id}
                className="comics-image"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Comics;
