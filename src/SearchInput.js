import React, { useState } from "react";
import "./SearchInput.css";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const [type, setType] = useState("title");

  const changeType = (e) => {
    console.log(e.target);
  };
  const searchMovie = () => {
    if (input) {
      window.location.href = `/search?${type}=${input}`;
    }
  };

  return (
    <nav className="p-2" id="search-input">
      <div className="row g-2">
        <div className="col-2">
          <select
            className="form-select form-select-sm"
            id="search-type"
            style={{ border: "1px solid #ced4da" }}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="all">All</option>
            <option selected value="title">
              Title
            </option>
          </select>
        </div>
        <div class="col">
          <input
            type="search"
            className="form-control form-control-sm"
            id="search-input-field"
            onInput={(e) => {
              setInput(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                console.log(e.key);
                searchMovie();
              }
            }}
            value={input}
            placeholder={`search by ${type}`}
          />
        </div>
        <div className="col-1">
          <button
            type="submit"
            className="btn btn-sm btn-light"
            id="btn-search"
            style={{ border: "1px solid #ced4da" }}
            onClick={searchMovie}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
