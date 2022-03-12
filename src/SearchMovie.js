import React from "react";
import { useSearchParams } from "react-router-dom";
import CustomRange from "./CustomRange";

import SearchInput from "./SearchInput";
import useFetch from "./useFetch";

export default function SearchMovie() {
  const [query] = useSearchParams();
  const [res, err] = useFetch("/api/v1/movies?" + query.toString());

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(__dirname);
    console.log(query);
    const {
      ["min-rating"]: { value: minRating },
      ["released-after"]: { value: releasedAfter },
    } = e.target.elements;
    query.set("numericFilter", `imdb.rating>=${minRating}`);
    query.set("dateFilter", `released>=${releasedAfter}`);

    window.location.href = __dirname + `search?${query.toString()}`;
  };

  const handleReset = (e) => {
    e.preventDefault();
    query.delete("numericFilter");
    query.delete("dateFilter");
    window.location.href = __dirname + `search?${query.toString()}`;
  };

  return (
    <div id="app-container">
      <SearchInput />
      <main className="mx-auto" id="main-container" style={{ width: "960px" }}>
        <div className="d-flex justify-content-between" id="option-header">
          <button
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-options"
          >
            Filter
          </button>
        </div>
        <form
          id="filter-options"
          style={{ width: "50%" }}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <div className="row">
            <div className="col-4">
              <label htmlFor="min-rating">Minimum Rating</label>
            </div>
            <div className="col-8">
              <CustomRange formName="min-rating" min="0" max="10" step="0.1" />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label htmlFor="min-rating">Released After</label>
            </div>
            <div className="col-8">
              <input type="date" name="released-after" id="released-after" />
            </div>
            <input type="submit" value="Start Filtering" />
            <input type="reset" value="Clear Filter" />
          </div>
        </form>
        <div className="row mx-auto" id="result-container">
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
      </main>
    </div>
  );
}

function Movie({ title, poster, runtime, plot, genres, imdb }) {
  return (
    <div className="col-4 gy-5">
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
          <h5 className="movie-duration text-end">
            {Math.floor(runtime / 60) === 0
              ? `${runtime % 60}m`
              : `${Math.floor(runtime / 60)}h ${runtime % 60}m`}
          </h5>
          <p className="movie-plot">{plot}</p>
        </div>
        <div className="card-footer">
          <div id="genres" style={{ width: "80%" }}>
            {genres.map((genre) => (
              <span className="badge me-2 text-dark border border-dark">
                {genre}
              </span>
            ))}
          </div>
          <div className="text-end" id="rating">
            <i className="fas fa-star" style={{ color: "gold" }}></i>
            <strong>{` ${imdb.rating}`}</strong>/10
          </div>
        </div>
      </div>
    </div>
  );
}
