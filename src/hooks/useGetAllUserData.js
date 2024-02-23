import { useEffect, useState } from "react";
import useContextHook from "./useContextHook";
import useGetLocalStorage from "./useGetLocalStorage";
import useSetLocalStorage from "./useSetLocalStorage";

function useGetAllUserData() {
  const { id, alasan, getData } = useContextHook();
  const localStorageCache = useGetLocalStorage("users") || [];
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useSetLocalStorage("users", localStorageCache);

  useEffect(() => {
    const setAllUsersData = async () => {
      try {
        const { users = localStorageCache } = await getData("/users");

        if (users.length === 0) return setIsError(true);
        setUsers(users);
      } finally {
        setIsLoading(false);
      }
    };

    setAllUsersData();
  }, [id, alasan]);

  return { users, isLoading, isError };
}

export default useGetAllUserData;
