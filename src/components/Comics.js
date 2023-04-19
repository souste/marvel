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

  const maxChars = 50;

  const truncateTitle = (title, comic) => {
    if (title.length > maxChars) {
      return (
        <div>
          {title.substring(0, maxChars)}...
          <Link to={`/characters/${character_id}/comics/${comic.id}`}></Link>
        </div>
      );
    }
    return title;
  };

  return comics.length === 0 ? (
    <p className="no-comics">No Comics for this character</p>
  ) : (
    <div>
      <ul className="comics-box">
        {comics
          .filter(
            (comic) =>
              comic.thumbnail &&
              !comic.thumbnail.path.includes("image_not_available")
          )
          .map((comic) => {
            return (
              <li key={comic.id} className="comics-list-box">
                <Link
                  to={{
                    pathname: `/characters/${character_id}/comics/${comic.id}`,
                  }}
                  key={comic.id}
                >
                  <p className="comic-title">
                    {truncateTitle(comic.title, comic)}
                  </p>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.id}
                    className="comics-image"
                  />
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Comics;
