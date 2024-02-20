import React, { useContext, useEffect, useMemo } from "react";
import { AppContext } from "../../App";
import CapresCard from "./CapresCard";

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
        `Masukkan alasan memilih ${
          listCapres.find((capres) => capres.id === id).namaPresiden
        } :`
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
    listCapres.map((capres, index) => (
      <CapresCard
        capres={capres}
        pilihCapres={pilihCapres}
        capresId={capresId}
        key={index + 1}
      />
    ));

  return <ul>{listCapres ? printListCapres() : null}</ul>;
}

export default ListCapresItems;
