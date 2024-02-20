import React from "react";

function CapresCard({ capres, capresId, pilihCapres }) {
  const { id, urlGambar, namaPresiden, namaWakil } = capres;

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
          <h5>Presiden : {namaPresiden}</h5>
          <p>Wakil : {namaWakil}</p>
        </figcaption>
      </figure>
    </li>
  );
}

export default React.memo(CapresCard);
