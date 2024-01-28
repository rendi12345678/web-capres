import React, { useContext, useMemo, useState, lazy, Suspense } from "react";
import { AppContext } from "../App";
const ListItem = lazy(() => import("./ListItem"));

function ListAlasan() {
  const [category, setCategory] = useState("1");
  const { users } = useContext(AppContext);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredAlasan = useMemo(() => {
    if (!users) return [];
    return users.filter((user) => user.pilihanCapresId === category);
  }, [users]);

  const printAlasan = useMemo(
    () => (data) =>
      data.map((user, index) => (
        <Suspense fallback={null} key={index + 1}>
          <ListItem user={user}/>
        </Suspense>
      )),
    []
  );

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
      <ul>{users ? printAlasan(filteredAlasan) : null}</ul>
    </section>
  );
}

export default React.memo(ListAlasan);
