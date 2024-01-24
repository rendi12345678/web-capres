import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import Button from "./Button";

function Header() {
  const {
    isAuthorized,
    setFormTypeAction,
    dispatch,
    userDetail,
    removeCookieToken,
    cookies,
    getData,
    setIsAuthorizedAction,
    setIsOpenUserAuthAction,
    setUserDetailAction,
    isOpenUserAuth,
  } = useContext(AppContext);

  const { nama } = userDetail;

  const renderAuthorizedHeader = () => (
    <div>
      <p>{nama}</p>
      <Button handleClick={removeCookieToken}>Keluar</Button>
    </div>
  );

  const renderUnauthorizedHeader = () => (
    <div>
      <Button className="daftar" handleClick={() => dispatch(setFormTypeAction("/sign up"))}>
        Daftar
      </Button>
      <Button className="masuk" handleClick={() => dispatch(setFormTypeAction("/login"))}>
        Masuk
      </Button>
    </div>
  );

  return (
    <header>
      <h1>
        Pemilu Online <span>Capres</span>
      </h1>
      {isAuthorized ? renderAuthorizedHeader() : renderUnauthorizedHeader()}
    </header>
  );
}

export default Header;
