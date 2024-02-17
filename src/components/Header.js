import React from "react";
import useContextHook from "../hooks/useContextHook";
import Button from "./Button";
function Header() {
  const {
    isAuthorized,
    setFormTypeAction,
    dispatch,
    userDetail,
    removeCookieToken,
  } = useContextHook();

  const { nama } = userDetail;

  const renderAuthorizedHeader = () => (
    <div>
      <p>{nama}</p>
      <Button handleClick={removeCookieToken}>Keluar</Button>
    </div>
  );

  const renderUnauthorizedHeader = () => (
    <div>
      <Button
        className="daftar"
        handleClick={() => dispatch(setFormTypeAction("/sign up"))}
      >
        Daftar
      </Button>
      <Button
        className="masuk"
        handleClick={() => dispatch(setFormTypeAction("/login"))}
      >
        Masuk
      </Button>
    </div>
  );

  return (
    <header>
      <h1>
        Hiburan <span>Pilpres</span>
      </h1>
      {isAuthorized ? renderAuthorizedHeader() : renderUnauthorizedHeader()}
    </header>
  );
}

export default React.memo(Header);
