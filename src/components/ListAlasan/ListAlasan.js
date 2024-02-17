import React, { lazy, useMemo, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import useGetAllUserData from "../../hooks/useGetAllUserData.js";
import SearchBar from "./SearchBar";
const ListItem = lazy(() => import("./ListItem.js"));

function ListAlasan() {
  const [category, setCategory] = useState("1");
  const [query, setQuery] = useState("");
  const { users, isError, isLoading } = useGetAllUserData();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const regex = new RegExp(query, "i");
    return users.filter(
      (user) =>
        user.pilihanCapresId === category && regex.test(user.nama.toLowerCase())
    );
  }, [category, query, users.length]);

  return (
    <section className="list-alasan">
      <h3>
        Alasan2 pilih &nbsp;
        <select
          name="capres"
          id="capres"
          onChange={handleCategoryChange}
          value={category}
        >
          <option value="1">Prabowo</option>
          <option value="2">Ganjar</option>
          <option value="3">Anies</option>
        </select>
      </h3>
      <SearchBar setQuery={setQuery} />
      <ListItem users={filteredUsers} isError={isError} isLoading={isLoading} />
    </section>
  );
}

export default React.memo(ListAlasan);
