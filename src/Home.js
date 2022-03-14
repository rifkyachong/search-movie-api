import React from "react";
import SearchInput from "./SearchInput";

export default function Home() {
  return (
    <div id="app-container">
      <h2 className="mt-5 mb-4 text-center" id="title">
        Search Movie API
      </h2>
      <SearchInput />
      <div style={{ minHeight: "100vh" }}></div>
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
