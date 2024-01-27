import React, { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from "../App";
function ListCapres() {
  const { postData, cookies, userDetail, isAuthorized } =
    useContext(AppContext);
  const [capresId, setCapresId] = useState("0");

  useEffect(() => {
    if (userDetail.pilihanCapresId !== "") {
      setCapresId(userDetail.pilihanCapresId);
    }
  }, [userDetail]);

  const pilihCapres = useMemo(
    () => async (id) => {
      if (!isAuthorized) return alert("Silahkan login dulu!");
      const inputAlasan = window.prompt("Masukkan alasan memilih:");

      if (inputAlasan === null) {
        return;
      }

      setCapresId(id);
      const data = await postData(`/pilih-capres/${cookies.token}/${id}`, {
        pilihanCapresId: id,
        alasan: inputAlasan,
      });

      if (data.success) {
        window.location.reload();
      }
    },
    [isAuthorized, postData, cookies.token]
  );

  return (
    <section className="list-capres">
      <h3>Coblos pilihan anda</h3>
      <ul>
        <li>
          <figure>
            <div onClick={() => pilihCapres("1")}>
              <img src="/img/prabowo-gibran.jpg" alt="Prabowo - Gibran" />
              <h1
                className="prabowo"
                style={{ display: capresId === "1" ? "block" : "none" }}
              >
                TERPILIH!
              </h1>
            </div>
            <figcaption>
              <h5>Presiden : Prabowo Subianto</h5>
              <p>Wakil : Gibran Rakabuming Raka</p>
            </figcaption>
          </figure>
        </li>
        <li>
          <figure>
            <div onClick={() => pilihCapres("2")}>
              <img src="/img/ganjar-mahfud.jpg" alt="Ganjar - Mahfud" />
              <h1
                className="ganjar"
                style={{ display: capresId === "2" ? "block" : "none" }}
              >
                TERPILIH!
              </h1>
            </div>
            <figcaption>
              <h5>Presiden : Ganjar Pranowo</h5>
              <p>Wakil : Mahfud Md</p>
            </figcaption>
          </figure>
        </li>
        <li>
          <figure>
            <div onClick={() => pilihCapres("3")}>
              <img src="/img/anis-muhaimin.webp" alt="Anies - Muhaimin" />
              <h1
                className="anies"
                style={{ display: capresId === "3" ? "block" : "none" }}
              >
                TERPILIH!
              </h1>
            </div>
            <figcaption>
              <h5>Presiden : Anies Baswedan</h5>
              <p>Wakil : Muhaimin Iskandar</p>
            </figcaption>
          </figure>
        </li>
      </ul>
    </section>
  );
}

export default React.memo(ListCapres);
