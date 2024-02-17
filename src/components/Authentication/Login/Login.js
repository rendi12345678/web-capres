import React from "react";
import useContextHook from "../../../hooks/useContextHook";
import Button from "../../Button";
import Input from "../../Input";
function Login() {
  const {
    dispatch,
    namaRef,
    passwordRef,
    setFormTypeAction,
    setIsOpenUserAuthAction,
    handleLoginSubmit,
  } = useContextHook();

  return (
    <>
      <h1>Masuk</h1>
      <form onSubmit={handleLoginSubmit}>
        <Input
          type="text"
          ref={namaRef}
          name="nama"
          placeholder="Masukkan nama anda!"
        />
        <Input
          type="password"
          ref={passwordRef}
          name="password"
          placeholder="Masukkan password anda!"
        />
        <div>
          <Button
            type="button"
            className="close-btn"
            handleClick={() => dispatch(setIsOpenUserAuthAction(false))}
          >
            Keluar
          </Button>
          <Button type="submit">Masuk</Button>
        </div>
        <p>
          <span>Belum punya akun?</span>{" "}
          <Button
            className="change-form-type-btn"
            handleClick={() => dispatch(setFormTypeAction("/sign up"))}
          >
            Daftar
          </Button>
        </p>
      </form>
    </>
  );
}

export default React.memo(Login);
