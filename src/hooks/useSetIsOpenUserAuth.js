import { useCallback, useEffect, useState } from "react";

function useSetIsOpenUserAuth() {
  const [isOpenUserAuth, setIsOpenUserAuth] = useState(false);

  const handleSetIsOpenUserAuth = useCallback(
    (value) => {
      setIsOpenUserAuth(value);
    },
    [isOpenUserAuth]
  );

  useEffect(() => {
    console.log(isOpenUserAuth);
  }, [isOpenUserAuth]);

  return { isOpenUserAuth, setIsOpenUser: handleSetIsOpenUserAuth };
}

export default useSetIsOpenUserAuth;
