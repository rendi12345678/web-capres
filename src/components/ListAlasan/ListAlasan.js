import React, { lazy, useContext, useEffect, useMemo, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { AppContext } from "../../App";
import SearchBar from "./SearchBar";
const ListItem = lazy(() => import("./ListItem.js"));

function ListAlasan() {
  const [category, setCategory] = useState("1");
  const [query, setQuery] = useState("");
  const { getData, id, alasan } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const setAllUsersData = async () => {
      const userData = await getData("/users");

      if (userData.length) return setIsError(true);
      setUsers(userData.users);
      setIsError(false);
    };

    setAllUsersData();
  }, [id, alasan]);

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
      <SearchBar query={query} setQuery={setQuery} />
      <ListItem users={filteredUsers} isError={isError} />
    </section>
  );
}

export default React.memo(ListAlasan);
