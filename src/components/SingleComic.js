import "./SingleComic.css";
import searchAPIs from "../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function SingleComic() {
  const { comic_id } = useParams();
  const { character_id } = useParams();
  const [singleComic, setSingleComic] = useState({});

  useEffect(() => {
    searchAPIs.searchComicsByComicID(comic_id).then((data) => {
      // const comicsWithDescription = data.filter(
      //   (comic) => comic.description != null
      // );
      // const comicsWithoutDescription = data.filter(
      //   (comic) => !comic.description == null
      // );
      // const sortedData = [
      //   ...comicsWithDescription,
      //   ...comicsWithoutDescription,
      // ];
      console.log(data[0]);
      setSingleComic(data[0]);
    });
  }, [comic_id]);

  return (
    <div className="single-comic-all">
      <Link to={`/characters/${character_id}`}>
        <FontAwesomeIcon icon={faTimes} className="character-back-button" />
      </Link>

      <li className="single-comic-box" key={singleComic.id}>
        {singleComic.thumbnail && (
          <img
            src={`${singleComic.thumbnail.path}.${singleComic.thumbnail.extension}`}
            alt={singleComic.id}
            className="single-comic-image"
          />
        )}
        <div className="single-comic-information">
          <h1 className="single-comic-title">{singleComic.title}</h1>
          {singleComic.description ? (
            <p className="single-comic-description">
              {singleComic.description}
            </p>
          ) : (
            <p className="single-comic-description">
              No Description provided for this comic
            </p>
          )}
          <h2 className="information-title">Information:</h2>
          <p className="single-comic-id">ID: {singleComic.id}</p>
          {singleComic.dates && (
            <p>
              Release Date:
              {new Date(singleComic.dates[0].date).toLocaleDateString()}
            </p>
          )}
          {singleComic.prices && singleComic.prices.length > 0 ? (
            <p>Price: ${singleComic.prices[0].price}</p>
          ) : (
            <p>Price not available</p>
          )}
          <p>PageCount: {singleComic.pageCount}</p>
          <p>Format: {singleComic.format}</p>
          <h3 className="creators-title">Creators:</h3>

          {singleComic.creators &&
            singleComic.creators.items.length > 0 &&
            singleComic.creators.items.map((creator) => (
              <p>
                {creator.name} Role: {creator.role}
              </p>
            ))}
        </div>
      </li>
    </div>
  );
}

export default SingleComic;
