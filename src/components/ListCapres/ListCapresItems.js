import React from "react";
import usePilihCapres from "../../hooks/usePilihCapres";
import useUserDetail from "../../hooks/useUserDetail";
import CapresCard from "./CapresCard";

function ListCapresItems() {
  const { listCapres, pilihCapres, setCapresIdAction, capresId } =
    usePilihCapres();
  useUserDetail(setCapresIdAction);

  const printListCapres = () =>
    listCapres.map((capres, index) => (
      <CapresCard
        id={capres.id}
        urlGambar={capres.urlGambar}
        namaPresiden={capres.namaPresiden}
        namaWakil={capres.namaWakil}
        pilihCapres={pilihCapres}
        capresId={capresId}
        key={index + 1}
      />
    ));

  return <ul>{listCapres ? printListCapres() : null}</ul>;
}

export default React.memo(ListCapresItems);
