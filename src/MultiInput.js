import React, { useRef } from "react";

export default function MultiInput({ genres, setGenres, datalist }) {
  const inputValue = useRef(null);

  const deleteBadge = (value) => {
    const newGenres = genres.filter((genre) => genre !== value);
    setGenres(newGenres);
  };

  const addBadge = (value) => {
    if (!genres.includes(value)) {
      const newGenres = [...genres, value];
      setGenres(newGenres);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || "Tab") {
      e.preventDefault();
      const value = inputValue.current.value;
      if (/\w+/.test(value)) {
        addBadge(value);
        inputValue.current.value = "";
      }
    }
  };

  return (
    <div
      className="multi-input p-1 d-flex flex-wrap"
      style={{ border: "1px solid black" }}
    >
      {genres.map((elem) => (
        <Badges value={elem} deleteBadge={deleteBadge} />
      ))}
      <input
        type="text"
        className="dynamic-input flex-grow-1 border-0"
        ref={inputValue}
        list="genre-list"
        style={{ outline: "0", minWidth: "15em" }}
        onKeyDown={handleKeyDown}
      />
      <datalist id="genre-list">
        {datalist.map((genre) => (
          <option value={genre} />
        ))}
      </datalist>
    </div>
  );
}

function Badges({ value, deleteBadge }) {
  return (
    <div
      className="badge me-1 lh-base"
      style={{ color: "inherit", border: "1px solid black" }}
    >
      {value}
      <div
        className="tag-delete d-inline-block text-end"
        style={{ width: "1.33em" }}
      >
        <i class="fas fa-times" onClick={(e) => deleteBadge(value)}></i>
      </div>
    </div>
  );
}
