import React, { useState } from "react";

function SearchBar({ setQuery }) {
  const [isSearching, setIsSearching] = useState(false);

  const debounce = (cb, delay = 1000) => {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const handleQueryChange = debounce((text) => {
    setQuery(text);
  }, 1000);

  return (
    <>
      <h5 className="search-title">Cari nama user : </h5>
      <input
        type="search"
        placeholder="Ketikkan sesuatu untuk mencari!"
        onChange={(e) => handleQueryChange(e.target.value)}
      />
    </>
  );
}

export default React.memo(SearchBar);
