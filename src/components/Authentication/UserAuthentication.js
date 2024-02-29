import React, { useRef } from "react";
import useContextHook from "../../hooks/useContextHook";
import useOverlayAnimations from "../../hooks/useOverlayAnimations";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

function UserAuthentication() {
  const { formType, isOpenUserAuth } = useContextHook();
  const overlayRef = useRef();
  useOverlayAnimations({ overlayRef, isOpenUserAuth });

  const renderUserAuthentication = () => {
    if (!isOpenUserAuth) return null;
    if (formType !== "/login") return <SignUp />;
    return <Login />;
  };

  const renderOverlay = () => {
    return (
      <div className="overlay" ref={overlayRef}>
        <div className="wrapper">{renderUserAuthentication()}</div>
      </div>
    );
  };

  return <>{renderOverlay()};</>;
}

export default React.memo(UserAuthentication);
