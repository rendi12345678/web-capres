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
  } = useContext(AppContext);
  const { name, password } = formValues;

  return (
    <>
      <h1>Daftar</h1>
      <form>
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
          placeholder="Masukkan kata sandi!"
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
            handleClick={() => dispatch(setFormTypeAction("login"))}
          >
            Masuk
          </Button>
        </p>
      </form>
    </>
  );
}

export default SignUp;
