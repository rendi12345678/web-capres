import React, { useEffect, useRef } from "react";
import useContextHook from "../../hooks/useContextHook";
import { Login, SignUp } from "../lazyLoadComponents";

function UserAuthentication() {
  const { formType, isOpenUserAuth, dispatch, setFormTypeAction } =
    useContextHook();
  const overlayRef = useRef();

  const handleLinkChange = (value) => {
    dispatch(setFormTypeAction(value));
  };

  const renderUserAuthentication = () => {
    if (!isOpenUserAuth) return null;
    if (formType !== "/login")
      return <SignUp handleLinkChange={handleLinkChange} />;
    return <Login handleLinkChange={handleLinkChange} />;
  };

  const renderOverlay = () => {
    return (
      <div className="overlay" ref={overlayRef}>
        <div className="wrapper">{renderUserAuthentication()}</div>
      </div>
    );
  };

  const addCloseOverlayAnimation = () => {
    changeOpacity("0");
    setTimeout(() => {
      changeDisplay("none");
    }, 500);
  };

  const addOpenOverlayAnimation = () => {
    changeDisplay("flex");
    setTimeout(() => {
      changeOpacity("1");
    }, 500);
  };

  const changeDisplay = (value) => {
    overlayRef.current.style.display = value;
  };

  const changeOpacity = (value) => {
    overlayRef.current.style.opacity = value;
  };

  useEffect(() => {
    if (!isOpenUserAuth) return addCloseOverlayAnimation();
    addOpenOverlayAnimation();
  }, [isOpenUserAuth]);

  return <>{renderOverlay()};</>;
}

export default React.memo(UserAuthentication);
