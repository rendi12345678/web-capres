import React from "react";
import Input from "./Input";
import Button from './Button';

function Login() {
  return (
    <>
      <h1>Login</h1>
      <form>
        <Input
          type="text"
          value=""
          name="name"
          placeholder="Masukkan nama anda!"
        />
        <Input
          type="password"
          value=""
          name="password"
          placeholder="Masukkan kata sandi!"
        />
        <Button type="submit">Masuk</Button>
      </form>
    </>
  );
}

export default Login;
