import "./SingleComic.css";
import searchAPIs from "../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function SingleComic() {
  const { comic_id } = useParams();
  const [singleComic, setSingleComic] = useState({});

  useEffect(() => {
    searchAPIs.searchComicsByComicID(comic_id).then((data) => {
      console.log(data[0]);
      setSingleComic(data[0]);
    });
  }, [comic_id]);

  return (
    <div>
      <li className="single-comic-box">
        <h1>{singleComic.title}</h1>
        {singleComic.thumbnail && (
          <img
            src={`${singleComic.thumbnail.path}.${singleComic.thumbnail.extension}`}
            alt={singleComic.id}
          />
        )}
        {singleComic.description ? (
          <p>{singleComic.description}</p>
        ) : (
          <p>No Description provided for this comic</p>
        )}
      </li>
    </div>
  );
}

export default SingleComic;
