import { useEffect } from "react";

function useOverlayAnimations({ overlayRef, isOpenUserAuth }) {
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
    return addOpenOverlayAnimation();
  }, [isOpenUserAuth]);
}

export default useOverlayAnimations;
