import React, { useContext } from "react";
import Login from "./Login";
import { AppContext } from "../App";
import SignUp from "./SignUp";

function UserAuthentication() {
  const { formType, isOpenUserAuth } =
    useContext(AppContext);

  return (
    <div
      className="overlay"
      style={{ display: isOpenUserAuth ? "flex" : "none" }}
    >
      <div className="wrapper">
        {formType === "/login" ? <Login /> : <SignUp />}
      </div>
    </div>
  );
}

export default React.memo(UserAuthentication);
