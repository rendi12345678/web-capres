import React from "react";
import useContextHook from "../../../hooks/useContextHook";
import Button from "../../Button";
import Input from "../../Input";
function SignUp({ handleLinkChange }) {
  const {
    dispatch,
    namaRef,
    passwordRef,
    setIsOpenUserAuthAction,
    handleSignUpSubmit,
  } = useContextHook();

  return (
    <>
      <h1>Daftar</h1>
      <form onSubmit={handleSignUpSubmit}>
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
          <Button type="submit">Daftar</Button>
        </div>
        <p>
          <span>Sudah punya akun?</span>{" "}
          <Button
            className="change-form-type-btn"
            handleClick={() => handleLinkChange("/login")}
          >
            Masuk
          </Button>
        </p>
      </form>
    </>
  );
}

export default React.memo(SignUp);
