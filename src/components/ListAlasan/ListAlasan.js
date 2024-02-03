import React, {
  Suspense,
  lazy,
  useContext,
  useMemo,
  useState,
  useTransition,
} from "react";
import { AppContext } from "../../App";
import SearchBar from "./SearchBar";
const ListItem = lazy(() => import("./ListItem.js"));

function ListAlasan() {
  const [category, setCategory] = useState("1");
  const [query, setQuery] = useState("");
  const { users } = useContext(AppContext);
  const [isLoading, startTransition] = useTransition();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredAlasan = useMemo(() => {
    if (!users) return [];
    const regex = new RegExp(query, "i");
    return users.filter(
      (user) =>
        user.pilihanCapresId === category && regex.test(user.nama.toLowerCase())
    );
  }, [users, category, query]);

  const printAlasan = useMemo(
    () => (filteredData) => {
      let dataToPrinted = filteredData.map((user, index) => (
        <Suspense fallback={null} key={index + 1}>
          <ListItem user={user} />
        </Suspense>
      ));

      if (dataToPrinted.length === 0) return <p>Belum ada komentar!</p>;
      return dataToPrinted;
    },
    [query]
  );

  return (
    <section className="list-alasan">
      <h3>
        Alasan2 pilih &nbsp;
        <select
          name="capres"
          id="capres"
          onChange={() => {
            startTransition(() => handleCategoryChange);
          }}
          value={category}
        >
          <option value="1">Prabowo</option>
          <option value="2">Ganjar</option>
          <option value="3">Anies</option>
        </select>
      </h3>
      <SearchBar query={query} setQuery={setQuery} />
      <ul>{users ? printAlasan(filteredAlasan) : null}</ul>
    </section>
  );
}

export default React.memo(ListAlasan);
