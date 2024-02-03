import React, { useContext } from "react";
import { AppContext } from "../../App";
import { Login, SignUp } from "../lazyLoadComponents";

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
