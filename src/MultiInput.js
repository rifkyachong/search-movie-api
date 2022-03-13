import React from "react";

export default function MultiInput() {
  const genres = [
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

  return (
    <div
      className="multi-input p-1 d-flex flex-wrap"
      style={{ border: "1px solid black" }}
    >
      {value.map((elem) => (
        <Badges val={elem} />
      ))}
      <input
        onKeyDown={handleKeyDown}
        list="genres"
        className="dynamic-input flex-grow-1 border-0"
        type="text"
        style={{ outline: "0", minWidth: "15em" }}
      />
      <datalist id="genres">
        {genres.map((genre) => (
          <option value={genre} />
        ))}
      </datalist>
    </div>
  );
}

function Badges(val) {
  return (
    <div
      className="badge me-1 lh-base"
      style={{ color: "inherit", border: "1px solid black" }}
    >
      {val}
      <div
        className="tag-delete d-inline-block text-end"
        style={{ width: "1.33em" }}
      >
        <i class="fas fa-times" onClick={deleteBadge}></i>
      </div>
    </div>
  );
}
