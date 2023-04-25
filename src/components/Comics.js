import "./Comics.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import searchAPIs from "../api";
import { Link } from "react-router-dom";

function Comics() {
  const { character_id } = useParams();
  const [comics, setComics] = useState([]);
  const [term, setTerm] = useState("");
  // const [offset, setOffset] = useState(50);

  useEffect(() => {
    if (!term) {
      searchAPIs.searchComicsByCharacterId(character_id).then((data) => {
        console.log("these are the comics", data);
        setComics(data);
      });
    } else {
      searchAPIs.searchComicsByCharacterId(character_id, term).then((data) => {
        console.log("these are the comics", data);
        setComics(data);
      });
    }
  }, [character_id, term]);

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

  const handleChange = (event) => {
    const newTerm = event.target.value;
    console.log(newTerm);
    setTerm(newTerm);
  };

  const handleClick = (event, item) => {
    event.preventDefault();
    setComics([item]);
  };

  // const handleLoadMore = () => {
  //   searchAPIs
  //     .searchComicsByCharacterId(character_id, 50, offset + 50)
  //     .then((data) => {
  //       console.log("these are the comics", data);
  //       setComics((comics) => [...comics, ...data]);

  //       setOffset(offset + 50);
  //     });
  // };

  // comics.length === 0 ? (
  //   <p className="no-comics">No Comics for this character</p>
  // ) :

  return (
    <div>
      <form className="comics-searchbar-box">
        <input
          defaultValue={term}
          onChange={handleChange}
          placeholder="  Search for any comic involving this character"
        />
        {/* <button onClick={handleLoadMore}>Next</button> */}
        {term !== "" && (
          <div className="comics-drop">
            {comics &&
              comics
                .filter((item) => item.title !== term)
                .map((item) => (
                  <div
                    onClick={(event) => handleClick(event, item)}
                    className="comics-search-dropdown"
                  >
                    {item.title}
                  </div>
                ))}
          </div>
        )}
      </form>

      <ul className="comics-box">
        {comics &&
          comics
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
