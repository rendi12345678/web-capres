import React, { useState, useContext, useEffect, useMemo } from "react";
import { AppContext } from "../../App";

function ListCapresItems() {
  const {
    id: capresId,
    setId,
    postData,
    cookies,
    userDetail,
    setAlasan,
    isAuthorized,
  } = useContext(AppContext);

  useEffect(() => {
    if (userDetail.pilihanCapresId !== "") {
      setId(userDetail.pilihanCapresId);
    }
  }, [userDetail]);

  const listCapres = [
    {
      id: "1",
      namaPresiden: "Prabowo Subianto",
      namaWakil: "Gibran Rakabuming Raka",
      urlGambar: "/img/prabowo-gibran.jpg",
    },
    {
      id: "2",
      namaPresiden: "Ganjar Pranowo",
      namaWakil: "Mahfud Md",
      urlGambar: "/img/ganjar-mahfud.jpg",
    },
    {
      id: "3",
      namaPresiden: "Anies Baswedan",
      namaWakil: "Muhaimin Iskandar",
      urlGambar: "/img/anis-muhaimin.webp",
    },
  ];

  const pilihCapres = useMemo(
    () => async (id) => {
      if (!isAuthorized) return alert("Silahkan login dulu!");

      const inputAlasan = window.prompt(
        `Masukkan alasan memilih ${listCapres.find((capres) => capres.id === id).namaPresiden} :`
      );

      if (inputAlasan === null) {
        return;
      }

      setId(id);
      const data = await postData(`/pilih-capres/${cookies.token}/${id}`, {
        pilihanCapresId: id,
        alasan: inputAlasan,
      });

      if (data.success) {
        setAlasan(() => inputAlasan);
      }
    },
    [capresId, isAuthorized]
  );

  const printListCapres = () =>
    listCapres.map(({ id, urlGambar, namaPresiden, namaWakil }) => (
      <li key={id}>
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
    ));

  return <ul>{listCapres ? printListCapres() : null}</ul>;
}

export default ListCapresItems;
