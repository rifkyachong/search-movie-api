import React from "react";
import SearchInput from "./SearchInput";

export default function SearchMovie() {
  return (
    <div id="app-container">
      <SearchInput />
      <div id="result-container" style={{ width: "960px" }}>
        Search Result
      </div>
    </div>
  );
}
