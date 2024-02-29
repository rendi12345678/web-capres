import React from "react";
import useContextHook from "../../../hooks/useContextHook";
import Form from "../../Form";
import Input from "../../Input";
function Login() {
  const { namaRef, passwordRef, handleLoginSubmit } = useContextHook();

  return (
    <>
      <h1>Masuk</h1>
      <Form onSubmit={handleLoginSubmit}>
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
      </Form>
    </>
  );
}

export default React.memo(Login);
