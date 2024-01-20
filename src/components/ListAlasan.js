import React from "react";

function ListAlasan() {
  return (
    <section className="list-alasan">
      <h3>
        Alasan2 pilih &nbsp;
        <select name="capres" id="capres">
          <option value="Prabowo">Prabowo</option>
          <option value="Prabowo">Ganjar</option>
          <option value="Prabowo">Anies</option>
        </select>
      </h3>
      <ul>
        <li>
          <blockquote>
            <p>
              " Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Corrupti sed quae fuga in, reiciendis labore! " -{" "}
              <strong>Ilham Ali</strong>
            </p>
          </blockquote>
        </li>
        <li>
          <blockquote>
            <p>
              " Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur hic officia fuga quidem laborum, eligendi
              voluptatibus inventore nesciunt assumenda consectetur suscipit
              dolore maiores quasi iste reiciendis alias, magnam praesentium
              sed? " - <strong>Fajar</strong>
            </p>
          </blockquote>
        </li>
        <li>
          <blockquote>
            <p>
              " Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Corrupti sed quae fuga in, reiciendis labore! " -{" "}
              <strong>Toni</strong>
            </p>
          </blockquote>
        </li>
      </ul>
    </section>
  );
}

export default ListAlasan;
