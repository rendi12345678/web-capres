import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import Login from "./Login";
import SignUp from "./SignUp";

function UserAuthentication() {
  const { formType, dispatch, setFormTypeAction } = useContext(AppContext);

  return (
    <div className="overlay">
      <div className="wrapper">
        {formType === "login" ? <Login /> : <SignUp />}
      </div>
    </div>
  );
}

export default UserAuthentication;
