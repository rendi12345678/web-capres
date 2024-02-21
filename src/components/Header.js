import React from "react";
import useContextHook from "../hooks/useContextHook";
import useGetLocalStorage from "../hooks/useGetLocalStorage";
import Button from "./Button";
function Header() {
  const {
    isAuthorized,
    setFormTypeAction,
    dispatch,
    removeCookieToken,
    setIsOpenUserAuthAction,
  } = useContextHook();

  const { nama } = useGetLocalStorage("user-detail");

  const renderAuthorizedHeader = () => (
    <div>
      <p>{nama}</p>
      <Button handleClick={removeCookieToken}>Keluar</Button>
    </div>
  );

  const handleAuthForm = (value) => {
    dispatch(setFormTypeAction(value));
    dispatch(setIsOpenUserAuthAction(true));
  };

  const renderUnauthorizedHeader = () => (
    <div>
      <Button className="daftar" handleClick={() => handleAuthForm("/sign-up")}>
        Daftar
      </Button>
      <Button className="masuk" handleClick={() => handleAuthForm("/login")}>
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
