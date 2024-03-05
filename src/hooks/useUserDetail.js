import { useEffect } from "react";
import useGetLocalStorage from "./useGetLocalStorage";

function useUserDetail(setCapresIdAction) {
  const userDetail = useGetLocalStorage("user-detail");

  useEffect(() => {
    if (userDetail.pilihanCapresId !== "") {
      setCapresIdAction(userDetail.pilihanCapresId);
    }
  }, [userDetail.pilihanCapresId, , userDetail.alasan]);
}

export default useUserDetail;
