import React, { useEffect, useMemo } from "react";
import useContextHook from "../../hooks/useContextHook";
import useGetLocalStorage from "../../hooks/useGetLocalStorage";
import CapresCard from "./CapresCard";

function ListCapresItems() {
  const {
    id: capresId,
    setId,
    postData,
    cookies,
    setAlasan,
    isAuthorized,
  } = useContextHook();

  const userDetail = useGetLocalStorage("user-detail");

  useEffect(() => {
    if (userDetail.pilihanCapresId !== "") {
      setId(userDetail.pilihanCapresId);
    }
  }, [userDetail.pilihanCapresId]);

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
