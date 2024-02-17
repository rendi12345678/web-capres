import React, { useEffect, useRef } from "react";
import useContextHook from "../../hooks/useContextHook";
import { Login, SignUp } from "../lazyLoadComponents";

function UserAuthentication() {
  const { formType, isOpenUserAuth } = useContextHook();
  const overlayRef = useRef();

  const renderUserAuthentication = () => {
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

  const addCloseOverlayAnimation = () => {
    overlayRef.current.style.opacity = "0";
    setTimeout(() => {
      overlayRef.current.style.display = "none";
    }, 500);
  };

  const addOpenOverlayAnimation = () => {
    overlayRef.current.style.display = "flex";
    setTimeout(() => {
      overlayRef.current.style.opacity = "1";
    }, 500);
  };

  useEffect(() => {
    if (!isOpenUserAuth) return addCloseOverlayAnimation();
    addOpenOverlayAnimation();
  }, [isOpenUserAuth]);

  return <>{renderOverlay()};</>;
}

export default React.memo(UserAuthentication);
