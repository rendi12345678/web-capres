import { useEffect, useState } from "react";
import useContextHook from "./useContextHook";

function useGetAllUserData() {
  const { id, alasan, getData } = useContextHook();
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setAllUsersData = async () => {
      setIsLoading(true);
      try {
        const { users = [] } = await getData("/users");

        if (users.length === 0) return setIsError(true);
        setUsers(users);
        setIsError(false);
      } finally {
        setIsLoading(false);
      }
    };

    setAllUsersData();
  }, [id, alasan]);

  return { users, isLoading, isError };
}

export default useGetAllUserData;
