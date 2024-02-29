function useRemoveCookieToken({
  removeCookie,
  setCapresIdAction,
  setIsAuthorized,
  setUserDetail,
}) {
  const removeCookieToken = () => {
    removeCookie("token", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
    setCapresIdAction("");
    setIsAuthorized({ isAuthorized: false });
    setUserDetail({});
  };
  return { removeCookieToken };
}

export default useRemoveCookieToken;
