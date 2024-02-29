import React, { useEffect } from "react";

function useCheckIsUserAuthorized({
  cookies,
  setIsAuthorized,
  setIsAuthorizedAction,
  localIsAuthorizedValue,
  localUserDetailValue,
  getData,
  setIsOpenUserAuthAction,
  setUserDetail,
  setUserDetailAction,
}) {
  useEffect(() => {
    const checkIsUserAuthorized = async () => {
      const token = cookies.token;
      if (!token) {
        setIsAuthorizedAction(false);
        return;
      }

      try {
        const {
          isAuthorized = localIsAuthorizedValue.isAuthorized,
          userDetail = localUserDetailValue,
        } = await getData(`/isAuthorized/${token}`);

        if (isAuthorized) {
          setIsAuthorized({ isAuthorized: true });
          setIsAuthorizedAction(true);
          setIsOpenUserAuthAction(false);
          setUserDetail(userDetail);
          setUserDetailAction(userDetail);
        } else {
          setIsAuthorized({ isAuthorized: false });
          setUserDetail({});
          setIsAuthorizedAction(false);
        }
      } catch (err) {
        setIsAuthorizedAction(true);
      }
    };

    checkIsUserAuthorized();
  }, [cookies.token]);

  return <div>useCheckIsUserAuthorized</div>;
}

export default useCheckIsUserAuthorized;
