import React from 'react'

function SearchBar({query, setQuery}) {
  return (
    <>
      <h5 className="search-title">Cari nama user : </h5>
      <input type="search" placeholder="Ketikkan sesuatu untuk mencari!" onChange={(e) => setQuery(e.target.value)}/>
    </>
  )
}

export default SearchBar