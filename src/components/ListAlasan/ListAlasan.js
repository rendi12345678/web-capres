import React, { lazy } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import useListAlasan from "../../hooks/useListAlasan.js";
import SearchBar from "./SearchBar";
import SelectAlasan from "./SelectAlasan.js";
const ListItem = lazy(() => import("./ListItem.js"));

function ListAlasan() {
  const { setCategory, category, setQuery, filteredUsers, isError, isLoading } =
    useListAlasan();

  return (
    <section className="list-alasan">
      <SelectAlasan setCategory={setCategory} category={category} />
      <SearchBar setQuery={setQuery} />
      <ListItem users={filteredUsers} isError={isError} isLoading={isLoading} />
    </section>
  );
}

export default React.memo(ListAlasan);
