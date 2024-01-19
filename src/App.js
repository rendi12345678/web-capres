import "./App.css";
import "./styles/reset.css";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>
          Web Pemilu <span>Capres</span>
        </h1>
      </header>
      <main>
        <section className="list-capres">
          <h3>Coblos pilihan anda</h3>
          <ul>
            <li>
              <figure>
                <img src="/img/prabowo-gibran.jpg" alt="Prabowo - Gibran" />
                <figcaption>
                  <h5>Presiden : Prabowo Subianto</h5>
                  <p>Wakil : Gibran Rakabuming Raka</p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src="/img/ganjar-mahfud.jpg" alt="Ganjar - Mahfud" />
                <figcaption>
                  <h5>Presiden : Ganjar Pranowo</h5>
                  <p>Wakil : Mahfud Md</p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src="/img/anis-muhaimin.webp" alt="Anies - Muhaimin" />
                <figcaption>
                  <h5>Presiden : Anies Baswedan</h5>
                  <p>Wakil : Muhaimin Iskandar</p>
                </figcaption>
              </figure>
            </li>
          </ul>
        </section>
        <section className="list-suara">
          <h3>Hasil semua suara</h3>
          <ul>
            <li>
              <h5>Prabowo : 11</h5>
            </li>
            <li>
              <h5>Ganjar : 10</h5>
            </li>
            <li>
              <h5>Anies : 9</h5>
            </li>
          </ul>
        </section>
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
                  Corrupti sed quae fuga in, reiciendis labore! " - <strong>Ilham Ali</strong>
                </p>
                
              </blockquote>
            </li>
            <li>
              <blockquote>
                <p>
                  " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur hic officia fuga quidem laborum, eligendi voluptatibus inventore nesciunt assumenda consectetur suscipit dolore maiores quasi iste reiciendis alias, magnam praesentium sed? " - <strong>Fajar</strong>
                </p>
                
              </blockquote>
            </li>
            <li>
              <blockquote>
                <p>
                  " Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corrupti sed quae fuga in, reiciendis labore! " - <strong>Toni</strong>
                </p>
                
              </blockquote>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
