import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../App";

function ListAlasan() {
  const [category, setCategory] = useState("prabowo");
  const { users } = useContext(AppContext);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const listAlasanPrabowo = useMemo(() => {
    return users.filter((user) => user.pilihanCapresId === "1");
  }, [users]);

  const listAlasanGanjar = useMemo(() => {
    return users.filter((user) => user.pilihanCapresId === "2");
  }, [users]);

  const listAlasanAnies = useMemo(() => {
    return users.filter((user) => user.pilihanCapresId === "3");
  }, [users]);

  const printAlasan = useMemo(() =>
    // Hapus pemanggilan fungsi, cukup gunakan referensi fungsi
    (data) =>
      data.reverse().map((user, index) => (
        <li key={index}>
          <blockquote>
            <p>
              " {user.alasan} " - <strong>{user.nama}</strong>
            </p>
          </blockquote>
        </li>
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
          <option value="prabowo">Prabowo</option>
          <option value="ganjar">Ganjar</option>
          <option value="anies">Anies</option>
        </select>
      </h3>
      <ul>
        {category === "prabowo" ? printAlasan(listAlasanPrabowo) : null}
        {category === "ganjar" ? printAlasan(listAlasanGanjar) : null}
        {category === "anies" ? printAlasan(listAlasanAnies) : null}
      </ul>
    </section>
  );
}

export default ListAlasan;
