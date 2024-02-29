import { useMemo } from "react";
import useContextHook from "./useContextHook";

function usePilihCapres() {
  const {
    id: capresId,
    setCapresIdAction,
    postData,
    cookies,
    setAlasanAction,
    isAuthorized,
  } = useContextHook();

  const listCapres = [
    {
      id: "1",
      namaPresiden: "Sandhika Galih",
      namaWakil: "Web Programming Unpas",
      urlGambar: "/img/prabowo-gibran.jpg",
    },
    {
      id: "2",
      namaPresiden: "Eko Kurniawan khannedy",
      namaWakil: "Programmer Zaman Now",
      urlGambar: "/img/ganjar-mahfud.jpg",
    },
    {
      id: "3",
      namaPresiden: "Kang Pukis",
      namaWakil: "Kelas Terbuka",
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

      setCapresIdAction(id);
      const data = await postData(`/pilih-capres/${cookies.token}/${id}`, {
        pilihanCapresId: id,
        alasan: inputAlasan,
      });

      if (data.success) {
        setAlasanAction(inputAlasan);
      }
    },
    [capresId, isAuthorized]
  );

  return { listCapres, setCapresIdAction, capresId, pilihCapres };
}

export default usePilihCapres;
