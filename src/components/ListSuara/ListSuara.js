import React, { useContext, useMemo, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";
import { AppContext } from "../../App";
function ListSuara() {
  const { users } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const jumlahPemilihanCapres = useMemo(() => {
    setIsLoading(() => true);
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

    setIsLoading(() => false);
    return voteCounts;
  }, [users]);

  const { prabowo, ganjar, anies } = jumlahPemilihanCapres;

  return (
    <section className="list-suara">
      <h3>Hasil semua suara</h3>
      <ul>
        <li>
          <h5>{prabowo ? `Prabowo ${prabowo}` : <Skeleton />}</h5>
        </li>
        <li>
          <h5>{ganjar ? `Ganjar ${ganjar}` : <Skeleton />}</h5>
        </li>
        <li>
          <h5>{anies ? `Anies ${anies}` : <Skeleton />}</h5>
        </li>
      </ul>
    </section>
  );
}

export default React.memo(ListSuara);
