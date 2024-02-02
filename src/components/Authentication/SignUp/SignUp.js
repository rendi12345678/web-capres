import React, { useContext } from "react";
import Input from "../../Input";
import Button from "../../Button";
import { AppContext } from "../../../App";
function SignUp() {
  const {
    dispatch,
    namaRef,
    passwordRef,
    setFormTypeAction,
    setIsOpenUserAuthAction,
    handleSignUpSubmit,
  } = useContext(AppContext);

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
            handleClick={() => dispatch(setFormTypeAction("/login"))}
          >
            Masuk
          </Button>
        </p>
      </form>
    </>
  );
}

export default React.memo(SignUp);
