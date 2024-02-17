import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useContextHook from "../../hooks/useContextHook";
import useGetAllUserData from "../../hooks/useGetAllUserData";
function ListSuara() {
  const { id, alasan } = useContextHook();
  const { isError, isLoading, users } = useGetAllUserData();

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
  }, [id, alasan, users.length]);

  const listSuaraSkeleton = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <li key={index + 1}>
          <Skeleton height={40} />
        </li>
      ));
  };

  const renderListSuara = () => (
    <>
      <li>
        <h5>Prabowo {prabowo}</h5>
      </li>
      <li>
        <h5>Ganjar {ganjar}</h5>
      </li>
      <li>
        <h5>Anies {anies}</h5>
      </li>
    </>
  );

  const { prabowo, ganjar, anies } = jumlahPemilihanCapres;

  const renderError = () => (
    <p style={{ color: "red", marginTop: "1rem" }}>Something went wrong!</p>
  );

  return (
    <section className="list-suara">
      <h3>Hasil semua suara</h3>
      <ul>
        {isLoading
          ? listSuaraSkeleton()
          : isError
          ? renderError()
          : renderListSuara()}
      </ul>
    </section>
  );
}

export default React.memo(ListSuara);
