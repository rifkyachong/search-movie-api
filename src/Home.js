import React from "react";
import SearchInput from "./SearchInput";

export default function Home() {
  return (
    <div id="app-container">
      <h2 className="mt-5 mb-4 text-center" id="title">
        Search Movie API
      </h2>
      <SearchInput />
    </div>
  );
}
