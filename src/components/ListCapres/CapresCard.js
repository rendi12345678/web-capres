import React from "react";

function CapresCard({
  id,
  urlGambar,
  namaPresiden,
  namaWakil,
  capresId,
  pilihCapres,
}) {
  return (
    <li>
      <figure>
        <div onClick={() => pilihCapres(id)}>
          <img src={urlGambar} alt={`${namaPresiden - namaWakil}`} />
          <h1
            className={namaPresiden}
            style={{ display: capresId === id ? "block" : "none" }}
          >
            TERPILIH!
          </h1>
        </div>
        <figcaption>
          <h5>Nama : {namaPresiden}</h5>
          <p>Channel : {namaWakil}</p>
        </figcaption>
      </figure>
    </li>
  );
}

export default React.memo(CapresCard);
