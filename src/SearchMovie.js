import React from "react";
import { useSearchParams } from "react-router-dom";

import SearchInput from "./SearchInput";
import useFetch from "./useFetch";

export default function SearchMovie() {
  const [query] = useSearchParams();
  const [res, err] = useFetch("/api/v1/movies?" + query.toString());

  return (
    <div id="app-container">
      <SearchInput />

      <div className="row" id="result-container" style={{ width: "960px" }}>
        {res ? (
          res.data.movies
            .filter((movie) => {
              const { title, runtime, plot } = movie;
              return title && runtime && plot;
            })
            .map((movie) => <Movie {...movie} />)
        ) : err ? (
          <h5 className="text-center">Something went wrong</h5>
        ) : (
          <h5 className="text-center">Loading...</h5>
        )}
      </div>
    </div>
  );
}

function Movie({ title, poster, runtime, plot }) {
  return (
    <div className="col-4 mx-auto gy-5">
      <div className="movie-item card">
        <div
          className="card-img-top"
          alt={`image of ${title}`}
          srcset=""
          style={{
            background: `url(${poster}), url("/image_not_available.png")`,
            height: "15rem",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          className="card-body"
          style={{
            height: "20rem",
            overflow: "hidden",
          }}
        >
          <h3 className="movie-title">{title}</h3>
          <h5 className="movie-duration text-end">{`${runtime} min`}</h5>
          <p className="movie-plot">{plot}</p>
        </div>
      </div>
    </div>
  );
}
