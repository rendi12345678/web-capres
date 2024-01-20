import React, { useContext } from "react";
import { AppContext } from "../App";

function Header() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <header>
      <h1>
        Pemilu Online <span>Capres</span>
      </h1>
      {isAuthenticated ? (
        <div>
          <p>Rendi Virgantara Setiawan</p>
          <button>Keluar</button>
        </div>
      ) : (
        <div>
          <button className="daftar">Daftar</button>
          <button className="masuk">Masuk</button>
        </div>
      )}
    </header>
  );
}

export default Header;
