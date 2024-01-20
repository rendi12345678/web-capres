import React from "react";

function ListCapres() {
  return (
    <section className="list-capres">
      <h3>Coblos pilihan anda</h3>
      <ul>
        <li>
          <figure>
            <div>
              <img src="/img/prabowo-gibran.jpg" alt="Prabowo - Gibran" />
              <h1 className="prabowo" style={{ display: "block" }}>
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
            <div>
              <img src="/img/ganjar-mahfud.jpg" alt="Ganjar - Mahfud" />
              <h1 className="ganjar">TERPILIH!</h1>
            </div>
            <figcaption>
              <h5>Presiden : Ganjar Pranowo</h5>
              <p>Wakil : Mahfud Md</p>
            </figcaption>
          </figure>
        </li>
        <li>
          <figure>
            <div>
              <img src="/img/anis-muhaimin.webp" alt="Anies - Muhaimin" />
              <h1 className="anies">TERPILIH!</h1>
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

export default ListCapres;
