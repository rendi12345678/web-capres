import React, { useContext, useMemo } from "react";
import { AppContext } from "../App";
function ListSuara() {
  const { users } = useContext(AppContext);

  const jumlahPemilihanCapres = useMemo(() => {
    const voteCounts = {
      prabowo: 0,
      ganjar: 0,
      anies: 0,
    };

    if (!users) return voteCounts;

    users.forEach(({ pilihanCapresId }) => {
      if (pilihanCapresId === "1") {
        voteCounts.prabowo += 1;
      } else if (pilihanCapresId === "2") {
        voteCounts.ganjar += 1;
      } else if (pilihanCapresId === "3") {
        voteCounts.anies += 1;
      }
    });

    return voteCounts;
  }, [users]);

  const { prabowo, ganjar, anies } = jumlahPemilihanCapres;

  return (
    <section className="list-suara">
      <h3>Hasil semua suara</h3>
      <ul>
        <li>
          <h5>Prabowo : {prabowo}</h5>
        </li>
        <li>
          <h5>Ganjar : {ganjar}</h5>
        </li>
        <li>
          <h5>Anies : {anies}</h5>
        </li>
      </ul>
    </section>
  );
}

export default React.memo(ListSuara);
