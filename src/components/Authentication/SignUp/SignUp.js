import React from "react";
import useContextHook from "../../../hooks/useContextHook";
import Form from "../../Form";
import Input from "../../Input";
function SignUp() {
  const { namaRef, passwordRef, handleSignUpSubmit } = useContextHook();

  return (
    <>
      <h1>Daftar</h1>
      <Form onSubmit={handleSignUpSubmit}>
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

export default React.memo(SignUp);
