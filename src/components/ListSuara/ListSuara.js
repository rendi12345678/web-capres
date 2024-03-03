import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useListSuara from "../../hooks/useListSuara";

function ListSuara() {
  const { jumlahPemilihanCapres, isLoading, isError } = useListSuara();

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
        <h5>Prabowo : {prabowo}</h5>
      </li>
      <li>
        <h5>Ganjar : {ganjar}</h5>
      </li>
      <li>
        <h5>Anies : {anies}</h5>
      </li>
    </>
  );

  const { prabowo, ganjar, anies } = jumlahPemilihanCapres;

  const renderError = () => (
    <p style={{ color: "red", marginTop: "1rem" }}>Something went wrong!</p>
  );

  const renderContent = () => {
    if (isLoading) return listSuaraSkeleton();
    if (isError) return renderError();
    return renderListSuara();
  };

  return (
    <section className="list-suara">
      <h3>Hasil semua suara</h3>
      <ul>{renderContent()}</ul>
    </section>
  );
}

export default React.memo(ListSuara);
