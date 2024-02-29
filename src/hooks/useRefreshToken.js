import React, { useEffect } from "react";

function useRefreshToken({ postData, cookies, setCookie }) {
  const refreshTokenValue = async () => {
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) return;

    const data = await postData("/token", { token: refreshToken });
    const expirationTimeToken = new Date();
    expirationTimeToken.setMinutes(expirationTimeToken.getMinutes() + 10);

    setCookie("token", data.token, {
      path: "/",
      expires: expirationTimeToken,
    });
  };

  useEffect(() => {
    const token = cookies.token;
    const refreshToken = cookies.refreshToken;
    if (!token && !refreshToken) return;
    if (!refreshToken) return;
    if (!token && refreshToken) refreshTokenValue();
  }, [cookies.token, cookies.refreshToken]);

  return <div>useRefreshToken</div>;
}

export default useRefreshToken;
