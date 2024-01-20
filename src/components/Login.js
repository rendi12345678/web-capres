import React, { useContext } from "react";
import Input from "./Input";
import Button from './Button';
import { AppContext } from "../App";

function Login() {
  const {handleOnchange, dispatch, formValues, setFormTypeAction} = useContext(AppContext)
  const {name, password} = formValues;

  return (
    <>
      <h1>Masuk</h1>
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
        <Button type="submit">Masuk</Button>
        <p><span>Belum punya akun?</span> <a href="#" onClick={() => dispatch(setFormTypeAction("sign up"))}>Daftar</a></p>
      </form>
    </>
  );
}

export default Login;
