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
    alasan,
  } = useContextHook();

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
        return alert("Input alasan tidak boleh kosong!");
      }

      if (inputAlasan.length < 10)
        return alert("Input alasan minimmal 10 karakter!");

      if (inputAlasan.length > 200)
        return alert("Input alasan maksimal 200 karakter!");

      const data = await postData(`/pilih-capres/${cookies.token}/${id}`, {
        pilihanCapresId: id,
        alasan: inputAlasan,
      });

      if (!data.success) {
        return alert(data.msg);
      }

      setCapresIdAction(id);
      setAlasanAction(inputAlasan);
    },
    [capresId, isAuthorized, alasan]
  );

  return { listCapres, setCapresIdAction, capresId, pilihCapres };
}

export default usePilihCapres;
