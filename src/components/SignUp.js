import React, { useContext } from "react";
import Input from "./Input";
import Button from "./Button";
import { AppContext } from "../App";
function SignUp() {
  const {
    handleOnchange,
    dispatch,
    formValues,
    setFormTypeAction,
    setIsOpenUserAuthAction,
    handleSignUpSubmit
  } = useContext(AppContext);
  const { name, password } = formValues;

  return (
    <>
      <h1>Daftar</h1>
      <form onSubmit={handleSignUpSubmit}>
        <Input
          type="text"
          value={name}
          handleOnChange={handleOnchange}
          name="nama"
          placeholder="Masukkan nama anda!"
        />
        <Input
          type="password"
          value={password}
          handleOnChange={handleOnchange}
          name="password"
          placeholder="Masukkan password amda!"
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
