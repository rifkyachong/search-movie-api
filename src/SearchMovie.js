import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomRange from "./CustomRange";
import SearchInput from "./SearchInput";
import useFetch from "./useFetch";
import "bootstrap";
import MultiInput from "./MultiInput";

export default function SearchMovie() {
  const [query] = useSearchParams();
  const [res, err] = useFetch("/api/v1/movies?" + query.toString());
  const [genres, setGenres] = useState([]);

  const genreList = [
    "action",
    "adventure",
    "animation",
    "biography",
    "comedy",
    "crime",
    "documentary",
    "drama",
    "family",
    "fantasy",
    "film-noir",
    "history",
    "horror",
    "music",
    "musical",
    "mystery",
    "news",
    "romance",
    "sci-fi",
    "short",
    "sport",
    "talk-show",
    "thriller",
    "war",
    "western",
  ];

  let nPage;
  if (res) {
    console.log(res.data.nMovies);
    nPage = Math.ceil(Number(res.data.nMovies) / 12);
    console.log(nPage);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      ["min-rating"]: { value: minRating },
      ["released-after"]: { value: releasedAfter },
    } = e.target.elements;

    query.set("numericFilter", `imdb.rating>=${minRating}`);
    query.set("dateFilter", `released>=${releasedAfter}`);
    query.set("genre", `${genres.join()}`);

    window.location.href = __dirname + `search?${query.toString()}`;
  };

  const handleReset = (e) => {
    e.preventDefault();

    query.delete("numericFilter");
    query.delete("dateFilter");
    query.delete("genre");

    window.location.href = __dirname + `search?${query.toString()}`;
  };

  const movePage = (e) => {
    e.preventDefault();

    const targetPage = e.target.innerHTML;

    query.set("page", targetPage);

    window.location.href = __dirname + `search?${query.toString()}`;
  };

  const sortMovie = (e) => {
    const { sort: field } = e.target.dataset;

    query.set("sort", `-${field}`);

    window.location.href = __dirname + `search?${query.toString()}`;
  };

  return (
    <div id="app-container">
      <SearchInput />
      <main
        className="mx-auto"
        id="main-container"
        style={{ width: "960px", minHeight: "100vh" }}
      >
        <div
          className="d-flex justify-content-between mb-3 border-bottom border-dark"
          id="option-header"
        >
          <button
            className="btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-options-container"
            style={{
              boxShadow: "none",
              borderBottom: "2px solid black",
              borderRadius: "0",
            }}
          >
            Filter Options
          </button>
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="sort-dropdown"
              data-bs-toggle="dropdown"
              // data-bs-target="#sort-options"
              style={{
                boxShadow: "none",
                borderBottom: "2px solid black",
                borderRadius: "0",
              }}
            >
              Sort by
            </button>
            <ul className="dropdown-menu" onClick={sortMovie}>
              <li>
                <a href="#" className="dropdown-item" data-sort="imdb.rating">
                  Rating
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item" data-sort="runtime">
                  Runtime
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ul className="dropdown-menu" id="sort-options">
          <li className="dropdown-item">Rating</li>
        </ul>
        <div className="collapse" id="filter-options-container">
          <form
            id="filter-options"
            style={{ width: "50%", fontSize: "0.75em" }}
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <div className="row">
              <div className="col-4">
                <label htmlFor="genres">Genres</label>
              </div>
              <div className="col-8">
                <MultiInput
                  genres={genres}
                  setGenres={setGenres}
                  datalist={genreList}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label htmlFor="min-rating">Minimum Rating</label>
              </div>
              <div className="col-8">
                <CustomRange
                  formName="min-rating"
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label htmlFor="released-after">Released After</label>
              </div>
              <div className="col-8">
                <input type="date" name="released-after" id="released-after" />
              </div>
              <input type="submit" value="Start Filtering" />
              <input type="reset" value="Clear Filter" />
            </div>
          </form>
        </div>
        <div className="mb-3">
          {res && (
            <p>
              {res.data.nMovies > 1
                ? `About ${res.data.nMovies} results`
                : `About ${res.data.nMovies} result`}
            </p>
          )}
        </div>
        <div className="row mx-auto" id="result-container">
          {res ? (
            res.data.movies.map((movie) => <Movie {...movie} />)
          ) : err ? (
            <h5 className="text-center text-danger">Something went wrong</h5>
          ) : (
            <h5 className="text-center">Loading...</h5>
          )}
          {res && res.data.movies.length === 0 && (
            <h5 className="text-center">No Result, please try again</h5>
          )}
        </div>
        {res && (
          <nav className="mt-5" onClick={movePage}>
            <ul
              className="pagination justify-content-center flex-wrap"
              id="pagination"
              onClick={movePage}
            >
              {[...Array(nPage).keys()]
                .map((x) => x + 1)
                .map((page) => {
                  return (
                    <li
                      className={
                        Number(query.get("page")) === page
                          ? "page-item active"
                          : "page-item"
                      }
                    >
                      <span className="page-link">{page}</span>
                    </li>
                  );
                })}
            </ul>
          </nav>
        )}
      </main>
      <footer
        className="p-4 text-center"
        style={{ backgroundColor: "darkslategrey", color: "white" }}
      >
        <h6>Search Movie API</h6>
        <h6>
          <a
            href="https://github.com/rifkyachong/search-movie-api"
            className="link-light text-decoration-none"
          >
            <i class="fab fa-github"></i> Source
          </a>
        </h6>
      </footer>
    </div>
  );
}

function Movie({ title, poster, runtime, plot, genres, imdb }) {
  return (
    <div className="col-4 gy-5">
      <div className="movie-item card">
        <div
          className="card-img-top"
          style={{
            height: "15rem",
            overflow: "hidden",
          }}
        >
          <img
            src={poster || "./image_not_available.png"}
            alt={`image of ${title}`}
            style={{ width: "100%", height: "auto" }}
            onError={(e) => (e.target.src = "./image_not_available.png")}
          />
        </div>
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
          <div className="genres" style={{ width: "80%" }}>
            {genres.map((genre) => (
              <span className="badge me-2 text-dark border border-dark">
                {genre}
              </span>
            ))}
          </div>
          <div className="text-end" id="rating">
            <i className="fas fa-star" style={{ color: "gold" }}></i>
            <strong>{` ${imdb.rating ? imdb.rating : "-"}`}</strong>/10
          </div>
        </div>
      </div>
    </div>
  );
}
