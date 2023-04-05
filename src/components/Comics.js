import "./Comics.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import searchAPIs from "../api";
import { Link } from "react-router-dom";

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
            <Link
              to={{
                pathname: `/characters/${character_id}/comics/${comic.id}`,
              }}
              key={comic.id}
            >
              <li className="comics-box">
                <p>{comic.title}</p>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.id}
                  className="comics-image"
                />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Comics;
