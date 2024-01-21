import React, { useContext } from "react";
import { AppContext } from "../App";
import Button from "./Button";

function Header() {
  const { isAuthenticated, setFormTypeAction, dispatch } = useContext(AppContext);

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
          <Button className="daftar" handleClick={() => dispatch(setFormTypeAction("sign up"))}>
            Daftar
          </Button>
          <Button className="masuk" handleClick={() => dispatch(setFormTypeAction("login"))}>
            Masuk
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header;
