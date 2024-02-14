import React, { useContext, useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { AppContext } from "../../App";
function ListSuara() {
  const { getData, id, alasan } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setAllUsersData = async () => {
      setIsLoading(true);
      try {
        const userData = await getData("/users");

        if (userData.length) return setIsError(true);
        setUsers(userData.users);
        setIsError(false);
      } finally {
        setIsLoading(false);
      }
    };

    setAllUsersData();
  }, [id, alasan]);

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
  }, [users.length]);

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
