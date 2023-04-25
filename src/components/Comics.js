import "./Comics.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import searchAPIs from "../api";
import { Link } from "react-router-dom";

function Comics() {
  const { character_id } = useParams();
  const [comics, setComics] = useState([]);
  const [term, setTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (!term) {
      searchAPIs.searchComicsByCharacterId(character_id).then((data) => {
        console.log("these are the comics", data);
        setComics(data);
      });
    } else {
      searchAPIs
        .searchComicsByCharacterId(character_id, 100, term)
        .then((data) => {
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
    setDropdownVisible(true);
  };

  const handleClick = (event, item) => {
    event.preventDefault();
    setComics([item]);
    setDropdownVisible(false);
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
          className="comics-search-bar"
        />
        {/* <button onClick={handleLoadMore}>Next</button> */}
        {term !== "" && dropdownVisible && (
          <div className="comics-dropdown">
            {comics &&
              comics.map((item) => (
                <div
                  className="comics-dropdown-row"
                  onClick={(event) => handleClick(event, item)}
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
                <Link
                  to={{
                    pathname: `/characters/${character_id}/comics/${comic.id}`,
                  }}
                  key={comic.id}
                  className="comics-link"
                >
                  <li key={comic.id} className="comics-list-box">
                    <p className="comic-title">
                      {truncateTitle(comic.title, comic)}
                    </p>
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
